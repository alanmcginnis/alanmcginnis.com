---
name: Semantic HTML Review
overview: Review and improve semantic HTML usage across the codebase, focusing on proper use of buttons vs links, semantic elements, and heading hierarchy.
todos:
  - id: analyze-backtoprev
    content: "Analyze BackToPrev usage and decide: keep as <a> for href navigation or change to <button> with JavaScript"
    status: completed
  - id: review-heading-hierarchy
    content: Review heading hierarchy across all pages (ensure proper h1, h2, h3 structure)
    status: completed
  - id: review-semantic-elements
    content: Review all components for div elements that could be semantic elements (section, article, nav, etc.)
    status: completed
  - id: review-interactive-elements
    content: Review all interactive elements to ensure buttons vs links are used correctly
    status: completed
  - id: clean-dead-code
    content: Remove unused back-to-prev JavaScript from Head.astro if not needed
    status: completed
  - id: document-findings
    content: Document all semantic HTML issues found for review
    status: completed
---

# Semantic HTML Review and Improvements

## Overview

Review the codebase for semantic HTML usage issues, ensuring proper use of interactive elements (buttons vs links), semantic HTML5 elements, and heading hierarchy.

## Issues Identified

### 1. BackToPrev Component - Navigation Element

**File**: `src/components/BackToPrev.astro`

- Currently uses `<a>` tag for navigation to home (`href="/"`)
- Since this is actual URL navigation, `<a>` is semantically correct
- However, there's unused JavaScript in `Head.astro` (lines 74-75) looking for `id="back-to-prev"` that would use `window.history.back()`
- **Decision needed**: Keep as `<a>` for href navigation, or change to `<button>` if we want to use history.back()

### 2. Dead Code in Head.astro

**File**: `src/components/Head.astro` (lines 74-75)

- JavaScript references `getElementById("back-to-prev")` but no element with this ID exists
- Should be removed if not needed, or BackToPrev should be updated to use history.back()

### 3. Semantic Elements Review Needed

Check for:

- `<div>` elements that could be replaced with semantic elements (`<section>`, `<article>`, `<aside>`, etc.)
- Heading hierarchy (proper `<h1>`, `<h2>`, etc. instead of styled divs)
- Interactive elements properly identified as buttons or links

### 4. Areas to Review

- **Header.astro**: Site name wrapped in Link - verify heading structure
- **Footer.astro**: Already uses `<footer>` - good
- **index.astro**: Uses `<section>` elements - verify heading levels
- **ArrowCard.astro**: Uses `<a>` for navigation - correct
- **BackToTop.astro**: Uses `<button>` - correct pattern

## Detailed Findings

### ✅ Good Practices Found

1. **Interactive Elements**:

- `BackToTop.astro`: Correctly uses `<button>` for scroll action
- `ArrowCard.astro`: Correctly uses `<a>` for navigation
- `Footer.astro`: Theme buttons correctly use `<button>` with `aria-label`
- Links use proper `<a>` tags with `aria-label` where appropriate

2. **Semantic Structure**:

- `PageLayout.astro`: Properly uses `<header>`, `<main>`, `<footer>`
- `Header.astro`: Uses `<header>` and `<nav>` correctly
- `Footer.astro`: Uses `<footer>` correctly
- `index.astro`: Uses `<section>` elements appropriately

3. **ARIA Labels**: 

- Theme buttons in Footer have proper `aria-label` attributes
- Social links have `aria-label` attributes

### ❌ Issues Found

#### 1. Heading Hierarchy Issues

**Issue**: Missing proper heading hierarchy. Pages start with `h4` or `h5` instead of `h1`, and several headings are `<div>` elements styled to look like headings.

**Files Affected**:

- **`src/pages/index.astro`**:
- Line 67: Uses `<h4>` for main page title - should be `<h1>`
- Lines 83, 104, 137: Uses `<h5>` for section titles - should be `<h2>` (if h1 is page title)
- Line 115: Uses `<div>` styled as heading for company names - should be `<h3>` or similar

- **`src/pages/highlights/[...slug].astro`**:
- Line 91: Uses `<div>` styled as heading for article title - should be `<h1>`
- Line 101: Uses `<h5>` for "Other Highlights" - should be `<h2>` (if h1 is article title)

- **`src/pages/highlights/index.astro`**:
- Line 16: Uses `<div>` styled as heading for page title - should be `<h1>`

- **`src/pages/experience/index.astro`**:
- Line 28: Uses `<div>` styled as heading for page title - should be `<h1>`
- Line 38: Uses `<div>` styled as heading for company names - should be `<h3>` or similar

**Impact**: Poor accessibility and SEO. Screen readers and search engines rely on proper heading hierarchy.

#### 2. Misuse of `<article>` Element

**Issue**: `<article>` is used incorrectly in some places.

**Files Affected**:

- **`src/pages/index.astro`**:
- Line 73: `<article>` wraps only a single `<p>` tag - `<article>` should contain standalone content that could be syndicated
- Line 86: `<article>` wraps only a `<p>` tag inside a section header - not appropriate use
- Line 140: `<article>` wraps only a `<p>` tag - not appropriate use

**Recommendation**: These should be plain `<div>` or just the `<p>` within the section.

#### 3. Dead Code

**Issue**: Unused JavaScript references non-existent element.

**File**: `src/components/Head.astro`

- Lines 74-75: JavaScript looks for `id="back-to-prev"` element that doesn't exist
- `BackToPrev` component doesn't have this ID and uses href navigation instead

**Recommendation**: Remove this unused code.

#### 4. Missing Semantic Structure

**Issue**: Some content could benefit from better semantic markup.

**Files Affected**:

- **`src/pages/index.astro`**:
- Company names and roles in experience section (lines 115-123) could use semantic markup like `<h3>` for company and `<p>` for role

- **`src/pages/highlights/[...slug].astro`**:
- Article title should be inside the `<article>` element as `<h1>`

- **`src/components/Header.astro`**:
- Site name (line 11) is wrapped in a Link but uses a `<div>` - could potentially use a heading element for better semantics, though the Link wrapper is acceptable

#### 5. Heading Levels Too Deep

**Issue**: Starting with `h4` or `h5` creates a poor heading hierarchy. Should start with `h1` for page titles, then `h2` for major sections.

**Current Structure** (example from index.astro):

- `<h4>` - Main greeting (should be `<h1>`)
- `<h5>` - Section titles (should be `<h2>`)

**Recommended Structure**:

- `<h1>` - Page title / Main heading
- `<h2>` - Major sections
- `<h3>` - Subsections within sections
- etc.

## Implementation Plan

1. **Fix Heading Hierarchy**:

- Convert all page titles from `<div>` or `<h4>/<h5>` to `<h1>`
- Convert all section titles to `<h2>`
- Ensure proper nesting (h1 → h2 → h3)

2. **Remove Incorrect `<article>` Usage**:

- Replace inappropriate `<article>` elements with `<div>` or remove wrapper

3. **Clean Up Dead Code**:

- Remove unused `back-to-prev` JavaScript from `Head.astro`

4. **Improve Semantic Markup**:

- Move article title inside `<article>` element
- Use proper heading elements for company names and other titles

5. **Verify Accessibility**:

- Ensure all changes maintain or improve accessibility
- Verify heading hierarchy with accessibility tools after changes