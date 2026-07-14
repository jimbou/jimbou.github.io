# Personal Site Editorial Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add five paper project links and give the existing bilingual personal site a restrained editorial visual refresh inspired by HoarePrompt and Gordian.

**Architecture:** Keep the static single-file architecture. `index.html` remains responsible for markup, styles, publication data, rendering, language switching, and small interactions; one Node test file provides a lightweight content and behavior contract without adding dependencies.

**Tech Stack:** HTML5, CSS, Tailwind CDN for compatibility with existing utility classes, vanilla JavaScript, Node.js built-in test runner, local Chromium visual inspection.

---

### Task 1: Lock the publication-link and interaction contract

**Files:**
- Create: `tests/site-contract.test.mjs`
- Test: `tests/site-contract.test.mjs`

- [ ] **Step 1: Write the failing contract tests**

```js
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
  ]) assert.match(html, new RegExp(url.replaceAll("/", "\\/")));
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
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test tests/site-contract.test.mjs`

Expected: FAIL because project URL fields, project-button labels, and mobile-navigation hooks are not present yet.

- [ ] **Step 3: Commit the test contract**

```bash
git add tests/site-contract.test.mjs
git commit -m "test: define personal site refresh contract"
```

### Task 2: Implement the restrained editorial refresh

**Files:**
- Modify: `index.html`
- Test: `tests/site-contract.test.mjs`

- [ ] **Step 1: Add the typography and design-token layer**

In `<head>`, add Newsreader, Source Sans 3, and DM Mono from Google Fonts. Replace the small existing style block with CSS variables and focused component styles for the paper background, serif headings, amber detail color, editorial cards, publication rows, accessible focus states, responsive navigation, and reduced motion. Retain existing Tailwind utilities where they still describe layout cleanly.

- [ ] **Step 2: Refine the existing markup without changing its information architecture**

Keep the current header, hero, About, Research, Publications, Honors, footer, and WeChat dialog. Add a mobile navigation button and menu, editorial section labels, a framed portrait treatment, and restrained component classes. Do not remove the language toggle, either CV, any biography text, research interest, publication, honor, contact method, or social link.

- [ ] **Step 3: Add project-page data and actions**

Add a `project` field to HoarePrompt, Gordian, CapScope, Optimised Fitness Functions, and LLM-Assisted Crossover. Keep existing paper links under `link`. Extend publication rendering to show separate localized Project and Paper actions when each field is available:

```js
const actions = [
  p.project ? `<a href="${esc(p.project)}" target="_blank" rel="noopener" class="publication-link"><span data-i18n="pub.project">${esc(pick(i18n["pub.project"], lang))}</span> <span aria-hidden="true">↗</span></a>` : "",
  p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener" class="publication-link">${esc(pick(i18n["pub.paper"], lang))} <span aria-hidden="true">↗</span></a>` : "",
].filter(Boolean).join("");
```

- [ ] **Step 4: Add mobile navigation behavior**

Toggle `aria-expanded` and the menu's hidden state from `#nav-toggle`; close the menu after a mobile navigation link is chosen. Preserve language-toggle and modal event handling.

- [ ] **Step 5: Run the contract tests**

Run: `node --test tests/site-contract.test.mjs`

Expected: all tests PASS.

- [ ] **Step 6: Commit the implementation**

```bash
git add index.html
git commit -m "feat: refresh personal site and add project links"
```

### Task 3: Verify behavior and visual quality

**Files:**
- Modify if needed: `index.html`
- Test: `tests/site-contract.test.mjs`

- [ ] **Step 1: Check source integrity**

Run: `node --check <(sed -n '/<script>/,/<\\/script>/p' index.html | sed '1d;$d')`

Expected: no syntax errors.

- [ ] **Step 2: Start a local server**

Run: `python3 -m http.server 8000`

Expected: the site is available at `http://localhost:8000/`.

- [ ] **Step 3: Capture desktop and mobile renders**

Run desktop Chromium at `1440x1200` and mobile Chromium at `390x844`, capturing full-page screenshots. Inspect hierarchy, overflow, navigation, typography, publication actions, focus visibility, and modal layering.

Expected: no clipping or horizontal overflow; the redesign remains recognizably the same website; Project and Paper actions are visually distinct and usable.

- [ ] **Step 4: Re-run automated verification after any visual fixes**

Run: `node --test tests/site-contract.test.mjs && git diff --check`

Expected: all tests PASS and `git diff --check` reports no whitespace errors.

- [ ] **Step 5: Commit final polish if required**

```bash
git add index.html tests/site-contract.test.mjs
git commit -m "fix: polish responsive personal site layout"
```
