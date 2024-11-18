import path from 'path'
import { fileURLToPath } from 'url'
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const getTranslationsJson = (lang) => {
    const translationsPath = path.join(__dirname, 'locales', lang, 'translation.json');

    if (!fs.existsSync(translationsPath)) {
        return JSON.parse(fs.readFileSync(path.join(__dirname, 'locales', 'en-US', 'translation.json'), "utf-8"))
    }

    return JSON.parse(fs.readFileSync(translationsPath, 'utf-8'))
}
