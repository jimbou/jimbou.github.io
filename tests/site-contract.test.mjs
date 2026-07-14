import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("exposes all five paper project pages", () => {
  for (const url of [
    "https://bouras.online/hoareprompt/",
    "https://bouras.online/gordian/",
    "https://bouras.online/capscope/",
    "https://bouras.online/llmcrossover/",
    "https://bouras.online/fitness/",
  ]) {
    assert.match(html, new RegExp(url.replaceAll("/", "\\/")));
  }
});

test("keeps bilingual and publication rendering hooks", () => {
  assert.match(html, /id="lang-toggle"/);
  assert.match(html, /const publications = \[/);
  assert.match(html, /p\.project/);
  assert.match(html, /data-i18n="pub\.project"/);
});

test("adds accessible mobile navigation hooks", () => {
  assert.match(html, /id="nav-toggle"/);
  assert.match(html, /aria-controls="mobile-nav"/);
  assert.match(html, /id="mobile-nav"/);
});

test("keeps paper-backed publication titles linked", () => {
  assert.match(html, /const title = p\.link/);
  assert.match(html, /<p class="publication-title">\$\{title\}<\/p>/);
});

test("renders safe external project links", () => {
  assert.match(
    html,
    /p\.project\s*\?\s*`<a href="\$\{esc\(p\.project\)\}" target="_blank" rel="noopener"/,
  );
});

test("resets mobile navigation when returning to desktop", () => {
  assert.match(html, /window\.addEventListener\("resize"/);
  assert.match(html, /window\.innerWidth > 860/);
  assert.match(html, /@media \(min-width: 861px\)/);
});
