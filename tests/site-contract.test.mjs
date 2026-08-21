import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("exposes all six paper project pages", () => {
  for (const url of [
    "https://bouras.online/hoareprompt/",
    "https://bouras.online/gordian/",
    "https://bouras.online/capscope/",
    "https://bouras.online/llmcrossover/",
    "https://bouras.online/fitness/",
    "https://bouras.online/mnimi/",
  ]) {
    assert.match(html, new RegExp(url.replaceAll("/", "\\/")));
  }
});

test("associates Mnimi with statistical-independence-aware caching", () => {
  assert.match(
    html,
    /title: "Statistical Independence Aware Caching for LLM Workflows",\s+project: "https:\/\/bouras\.online\/mnimi\/"/,
  );
});

test("shows Gordian's invited KLEE Workshop presentation", () => {
  assert.match(
    html,
    /title: "Gordian:[^"]+",[\s\S]*?invitedPresentation: \{[\s\S]*?en: "Invited presentation · KLEE Workshop @ ASE 2026"[\s\S]*?zh: "特邀报告 · KLEE Workshop @ ASE 2026"[\s\S]*?link: "https:\/\/conf\.researchr\.org\/home\/ase-2026\/klee-2026"/,
  );
  assert.match(
    html,
    /p\.invitedPresentation[\s\S]*?class="publication-badge invited-presentation"[\s\S]*?esc\(pick\(p\.invitedPresentation\.label, lang\)\)/,
  );
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

test("links the SAMOS XXIII venue to the conference website", () => {
  assert.match(
    html,
    /venue: "SAMOS XXIII",\s+venueLink: "https:\/\/samos-conference\.com\/"/,
  );
  assert.match(
    html,
    /p\.venueLink\s*\?\s*`<a href="\$\{esc\(p\.venueLink\)\}" target="_blank" rel="noopener" class="publication-venue-link">\$\{esc\(pick\(p\.venue, lang\)\)\}<\/a>`/,
  );
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

test("uses the original sans-serif identity at the top", () => {
  assert.match(html, /--ui-sans:/);
  assert.match(html, /\.site-header \{[^}]*font-family: var\(--ui-sans\)/s);
  assert.match(html, /\.hero-copy h1 \{[^}]*font-family: var\(--ui-sans\)[^}]*font-weight: 700/s);
});

test("renders the portrait as a clean shadowed circle", () => {
  assert.match(html, /\.portrait-wrap::before, \.portrait-wrap::after \{ content: none; \}/);
  assert.match(html, /\.portrait-wrap img \{[^}]*border-radius: 50%[^}]*box-shadow:/s);
});

test("describes the Huawei AI kernel optimisation work in both languages", () => {
  assert.match(html, /agent design for AI kernel optimisation/);
  assert.match(html, /面向 AI 算子优化的智能体设计/);
});

test("shows the accepted LMPL 2026 venue for CapScope", () => {
  assert.match(html, /venue: "LMPL 2026",\s+title: "Authority Is Not a String:[^"]+",\s+project: "https:\/\/bouras\.online\/capscope\/"/);
  assert.doesNotMatch(html, /venue: \{ en: "Under submission", zh: "投稿中" \}/);
  assert.match(html, /publication-venue">\$\{venue\}/);
  assert.match(html, /: esc\(pick\(p\.venue, lang\)\);/);
});
