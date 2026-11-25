import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'

const base = '/Dr.Vaishnavi-Jayawant-health/'
const dist = new URL('../dist/', import.meta.url)
const html = await readFile(new URL('index.html', dist), 'utf8')
const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*>/gi)].map((match) => match[1])
const styles = [...html.matchAll(/<link\b[^>]*\brel="stylesheet"[^>]*\bhref="([^"]+)"/gi)]
  .map((match) => match[1])
  .filter((href) => !href.startsWith('https://'))

assert.ok(scripts.length > 0, 'The Pages artifact must load compiled JavaScript.')
assert.ok(styles.length > 0, 'The Pages artifact must load compiled CSS.')
assert.ok(!html.includes('/src/main.jsx'), 'The Pages artifact contains the Vite source entry.')
assert.ok(html.includes(`href="${base}favicon.svg"`), 'The favicon must use the Pages base path.')
assert.ok((await stat(new URL('favicon.svg', dist))).isFile(), 'Missing favicon.svg.')

for (const [urls, extension] of [[scripts, '.js'], [styles, '.css']]) {
  for (const url of urls) {
    assert.ok(url.startsWith(`${base}assets/`) && url.endsWith(extension),
      `Expected a compiled ${extension} asset under ${base}assets/, received ${url}.`)
    assert.ok((await stat(new URL(url.slice(base.length), dist))).isFile(), `Missing asset ${url}.`)
  }
}

console.log(`Verified compiled Pages assets under ${base}`)
