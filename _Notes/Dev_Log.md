# 2026-02-27

## Code cleanup

- See `.cursor/plans/code_review_&_optimizations_a87e6658.plan.md`
- Alt tag issues

## Style Updates

- Fixed issue with padding under back to home button on highlights pages. Added `mt-10` to top of article.
- Fixed minor content issue with quote from Jeremy on portal makeover. Quote block was auto inserting quotations in weird places, technically correct but it looked weird/
- Updated footer date, just by doing a build

## Dependency Updates

### Patch / Minor
- `@astrojs/mdx` ^4.3.12 → ^4.3.13
- `@astrojs/sitemap` ^3.6.0 → ^3.7.0
- `@fontsource/atkinson-hyperlegible-next` ^5.2.7 (no change)
- `@tailwindcss/typography` ^0.5.16 → ^0.5.19
- `@tailwindcss/vite` ^4.1.0 → ^4.2.1
- `astro` ^5.16.4 → ^5.18.0
- `clsx` ^2.1.0 → ^2.1.1
- `eslint-plugin-jsx-a11y` ^6.8.0 → ^6.10.2
- `sharp` ^0.33.3 → ^0.34.5
- `tailwindcss` ^4.1.0 → ^4.2.1
- `typescript` ^5.4.2 → ^5.9.3

### Major
- `@typescript-eslint/eslint-plugin` ^7 → ^8.56.1
- `@typescript-eslint/parser` ^7 → ^8.56.1
- `eslint` ^8 → ^9.39.3 (v10 skipped — peer dep incompatibility with eslint-plugin-jsx-a11y)
- `eslint-plugin-astro` ^0.34 → ^1.6.0
- `tailwind-merge` ^2 → ^3.5.0

### Removed
- `@fontsource/inter` — not imported anywhere in source

### Dependency Structure
- Moved all packages from `dependencies` → `devDependencies` (correct for a fully static Astro site)

### ESLint Migration
- Migrated from legacy `.eslintrc.cjs` to flat config `eslint.config.js` (required for ESLint v9+)
- Deleted `.eslintrc.cjs` and `.eslintignore` — ignore patterns moved into `eslint.config.js`
- Added `@eslint/js` and `typescript-eslint` meta packages
- Added `// eslint-disable-next-line` on intentional style-recalculation expression in `Head.astro`

### Node Version
- ESLint v9+ requires Node ^22.13.0 — switch default with: `nvm alias default 22.19.0`
