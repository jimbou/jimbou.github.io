# Personal Site Editorial Refresh Design

## Goal

Improve the existing bilingual personal website without changing its core structure or personality, and add direct project-page links for five publications.

## Scope

The site remains a single-page, static `index.html` with the current sections, English/Chinese toggle, CV switching, WeChat dialog, and content. No framework migration or information-architecture rewrite is included.

## Visual direction

Borrow the strongest shared traits from the HoarePrompt and Gordian sites: Newsreader display typography, Source Sans 3 body typography, a warm paper background, restrained blue and amber accents, fine borders, generous whitespace, and compact editorial labels. Keep the personal site's existing blue-grey identity so the result feels related rather than copied.

The hero keeps the portrait and biography but uses a more deliberate asymmetric composition, a small research-status label, a serif name, and quieter action buttons. Research interests remain a responsive grid with improved numbering, spacing, and hover treatment. Publications become bordered editorial rows with venue metadata, title, awards/status, and explicit action links.

## Publication links

- HoarePrompt: `https://bouras.online/hoareprompt/`
- Gordian: `https://bouras.online/gordian/`
- CapScope: `https://bouras.online/capscope/`
- LLM-Assisted Crossover: `https://bouras.online/llmcrossover/`
- Optimised Fitness Functions: `https://bouras.online/fitness/`

The Gordian path is inferred from the local Gordian site because the user-provided Gordian URL duplicated the HoarePrompt route.

## Behavior and accessibility

All current bilingual rendering remains data-driven. Project links open in a new tab with `rel="noopener"`, and publication titles continue to lead to the paper where available. Navigation gains a compact mobile menu so every section remains reachable on narrow screens. Visible focus styles, reduced-motion support, semantic sections, and the existing modal keyboard behavior are preserved or improved.

## Verification

Add a small Node contract test that reads `index.html` and checks the five project URLs, bilingual hooks, publication actions, mobile navigation hooks, and external-link safety. Run it with Node's built-in test runner, then serve the site locally and inspect desktop and mobile renders in Chromium.
