////////////////////////////////////////////////////////////////////////////////
// Subresource integrity (SRI) plugin for Vite (https://vitejs.dev/)
//
// Adds subresource integrity hashes to scripts and stylesheets
// imports from your index.html file at build time.
//
// Inspired by https://github.com/JonasKruckenberg/rollup-plugin-sri, so credits and kudos to Jonas Kruckenberg.
////////////////////////////////////////////////////////////////////////////////

import { createHash } from 'crypto'
import {load} from 'cheerio'
import fetch from 'node-fetch'

export default function sri () {
    return {
        name: 'vite-plugin-sri',
        enforce: 'post',
        apply: 'build',

        async transformIndexHtml(html, context) {
            const bundle = context.bundle

            const calculateIntegrityHashes = async (element) => {
                let source
                let attributeName = element.attribs.src ? 'src' : 'href'
                const resourcePath = element.attribs[attributeName]
                if (resourcePath.startsWith('http')) {
                    // Load a remote source from URL.
                    source = await (await fetch(resourcePath)).buffer()
                } else {
                    // Load a local source from the bundle.
                    const resourcePathWithoutLeadingSlash = element.attribs[attributeName].slice(1)
                    const bundleItem = bundle[resourcePathWithoutLeadingSlash]
                    source = bundleItem.code || bundleItem.source
                }
                element.attribs.integrity = `sha384-${createHash('sha384').update(source).digest().toString('base64')}`
            }

            const $ = load(html)
            $.prototype.asyncForEach = async function (callback) {
                for (let index = 0; index < this.length; index++) {
                    await callback(this[index], index, this);
                }
            }

            // Implement SRI for scripts and stylesheets.
            const scripts = $('script').filter('[src]')
            const stylesheets = $('link[rel=stylesheet]').filter('[href]')

            await scripts.asyncForEach(calculateIntegrityHashes)
            await stylesheets.asyncForEach(calculateIntegrityHashes)

            return $.html()
        }
    }
}