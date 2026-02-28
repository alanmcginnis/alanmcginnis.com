---
name: Code Review & Optimizations
overview: A targeted code review of the Astro site covering CSS correctness, JS script positioning and efficiency, HTML head hygiene, accessibility, and minor dead code cleanup.
todos:
  - id: fix-css-translate
    content: Fix invalid translateY(--spacing(3)) → translateY(0.75rem) in global.css
    status: completed
  - id: fix-noopener
    content: Add rel="noopener noreferrer" to external links in Link.astro
    status: completed
  - id: fix-favicon
    content: Clean up redundant/ambiguous favicon declaration in Head.astro
    status: completed
  - id: fix-preload-theme
    content: Refactor inline script in Head.astro to avoid double preloadTheme() call on initial load
    status: completed
  - id: fix-vendor-prefixes
    content: Remove obsolete -webkit-/-moz-/-o-/-ms- transition prefixes from toggleTheme() in Head.astro
    status: completed
  - id: fix-dead-imports
    content: Remove commented-out dead imports in highlights/[...slug].astro
    status: completed
isProject: false
---

# Code Review & Optimization Plan

## Summary of Findings

The site is already lean: self-hosted fonts, no external JS, Vite-bundled CSS, and zero tracking scripts. The issues below are ordered by severity.

---

## 1. Bug — Invalid CSS in `global.css` (line 87)

File: `[src/styles/global.css](src/styles/global.css)`

```css
/* BROKEN — --spacing() is not valid CSS; it's a Tailwind build-time macro */
.animate {
  transform: translateY(--spacing(3));
}
```

The `.animate` class is meant to slide elements up on entrance, but the Y-transform silently no-ops. Fix options:

- Use `translateY(0.75rem)` (literal `3 × 0.25rem`)
- Or use a CSS custom property: `translateY(var(--spacing-3))` if defined in `@theme`

The `opacity: 0` part still works, so the fade-in animates but the slide-up doesn't.

---

## 2. Security — Missing `rel="noopener noreferrer"` on external links

File: `[src/components/Link.astro](src/components/Link.astro)`

```astro
<a target={ external ? "_blank" : "_self" } ...>
```

`target="_blank"` without `rel="noopener noreferrer"` allows the opened page to access `window.opener`, a known security and privacy risk. Should be:

```astro
rel={ external ? "noopener noreferrer" : undefined }
```

---

## 3. Head hygiene — Redundant/ambiguous favicon declaration

File: `[src/components/Head.astro](src/components/Head.astro)` lines 24–26

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" href="/apple-touch-icon.png" type="image/png">  <!-- ambiguous -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

Line 25 uses `apple-touch-icon.png` as a generic PNG favicon fallback — that's an oddly-named file for that purpose. Either:

- Add a separate `/favicon.png` for the generic PNG fallback, or
- Remove line 25 entirely (SVG favicons have excellent modern browser support, and the apple-touch-icon line 26 handles Apple devices)

---

## 4. JS — `preloadTheme()` runs twice on initial page load

File: `[src/components/Head.astro](src/components/Head.astro)` lines 157–159

```js
document.addEventListener("DOMContentLoaded", () => init());  // calls preloadTheme() inside init()
document.addEventListener("astro:after-swap", () => init());
preloadTheme();  // also called immediately here
```

`preloadTheme()` is called directly on line 159 (to prevent FOUC before DOM is ready — correct), and then again inside `init()` on `DOMContentLoaded`. This double-call is harmless but wasteful. The fix is to call `preloadTheme()` only once early, and have `init()` skip it:

```js
// Call once at script evaluation time (prevents FOUC)
preloadTheme();

function init() {
  onScroll();
  // ...event listeners only — don't call preloadTheme() here
}

document.addEventListener("DOMContentLoaded", () => init());
document.addEventListener("astro:after-swap", () => {
  preloadTheme(); // re-apply after view transitions
  init();
});
```

---

## 5. JS — `toggleTheme` creates/destroys a `<style>` element on every call

File: `[src/components/Head.astro](src/components/Head.astro)` lines 118–145

The flash-suppression trick (injecting a `* { transition: none !important }` style, forcing a reflow via `getComputedStyle`, then removing it) is correct and necessary. However it uses 4 vendor-prefixed transition properties (`-webkit-`, `-moz-`, `-o-`, `-ms-`) that are all obsolete — every modern browser uses unprefixed `transition`. Minor payload reduction: remove the 4 prefixed lines, keep only `transition: none !important`.

---

## 6. Dead imports in `[...slug].astro`

File: `[src/pages/highlights/[...slug].astro](src/pages/highlights/[...slug].astro)` lines 5–6

```js
// import FormattedDate from "@components/FormattedDate.astro";
// import { readingTime } from "@lib/utils";
```

These are commented out. If there's no plan to re-enable them, they should be removed.

---

## 7. Minor — `getCollection("highlights")` called twice in `[...slug].astro`

File: `[src/pages/highlights/[...slug].astro](src/pages/highlights/[...slug].astro)` lines 12 and 26

The highlights collection is fetched once inside `getStaticPaths()` and again at the page level to build the "Other Highlights" list. Because `getStaticPaths` runs in a separate scope, this is expected in Astro — not a real bug — but worth noting. Astro caches `getCollection` calls internally, so the performance impact is negligible.

---

## 8. Minor — `<ClientRouter />` has a trailing space

File: `[src/components/Head.astro](src/components/Head.astro)` line 52

```astro
<ClientRouter  />
```

Double space before `/>` — cosmetic only.

---

## Proposed Changes (in priority order)

- Fix `translateY(--spacing(3))` → `translateY(0.75rem)` in `global.css`
- Add `rel="noopener noreferrer"` to external links in `Link.astro`
- Clean up favicon declarations in `Head.astro` (remove or rename line 25)
- Refactor `init()` to avoid double `preloadTheme()` call on initial load
- Remove obsolete vendor-prefixed transitions from `toggleTheme()`
- Remove commented-out dead imports in `[...slug].astro`

