<script lang="ts" setup>
import type { Highlighter, Lang, Theme } from 'shiki'
import { BUNDLED_THEMES, getHighlighter, setCDN } from 'shiki'
import { onMounted, ref, watch } from 'vue'
import { BUNDLED_LANGUAGES_NAMES, defaultContent } from './data'
setCDN('https://unpkg.com/shiki/')

let h: Highlighter

const input = ref<string>(defaultContent)
const output = ref<string>('')

const lang = ref<Lang>('typescript')
const theme = ref<Theme>('vitesse-dark')

watch(input, (val) => {
    output.value = h.codeToHtml(val, { theme: theme.value, lang: lang.value })
})

watch(lang, async (val) => {
    if (!h.getLoadedLanguages().includes(val))
        await h.loadLanguage(val)
})

watch(theme, async (val) => {
    if (!h.getLoadedThemes().includes(val))
        await h.loadTheme(val)
    output.value = h.codeToHtml(input.value, { theme: val, lang: lang.value })
})

onMounted(async () => {
    h = await getHighlighter({ theme: theme.value, langs: [lang.value] })
    output.value = h.codeToHtml(defaultContent, { theme: theme.value, lang: lang.value })
})
</script>

<template>
    <div>
        <select v-model="lang">
            <option v-for="name of BUNDLED_LANGUAGES_NAMES" :key="name" :value="name">
                {{ name }}
            </option>
        </select>
        <select v-model="theme">
            <option v-for="themeName of BUNDLED_THEMES" :key="themeName" :value="themeName">
                {{ themeName }}
            </option>
        </select>
    </div>
    <div h-screen flex>
        <textarea v-model="input" font-mono text-4 text-inherit flex-1 p-0 bg-inherit outline-none border-none></textarea>
        <div flex-1 box-border text-4 bg-inherit v-html="output"></div>
    </div>
</template>

<style>
pre.shiki,
pre.shiki code{
    font-family: inherit;
    background-color: transparent !important;
}
</style>
