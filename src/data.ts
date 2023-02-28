import { BUNDLED_LANGUAGES } from 'shiki'

export const defaultContent = `const word = 'Hello World!'

function sayHello(){
    console.log(word)
}`

export const BUNDLED_LANGUAGES_NAMES = BUNDLED_LANGUAGES.map(({ id }) => id)
