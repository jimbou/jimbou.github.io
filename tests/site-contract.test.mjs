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

test("uses safe external project links", () => {
  assert.match(html, /target="_blank" rel="noopener"/);
});
