# Design System

Angular component library with Storybook documentation, accessibility testing, and visual regression via Chromatic.

---

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | 22+ |
| npm | 11+ |

---

## Setup

```bash
git clone https://github.com/divyansh98sharma/design-system.git
cd design-system
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` is required because `@storybook/test-runner` has not yet released a version declaring compatibility with Storybook 10.

---

## Commands

### Storybook (component development & docs)

```bash
# Start Storybook dev server → http://localhost:6006
npm run storybook

# Build a static Storybook for deployment
npm run build-storybook
```

### Angular app

```bash
# Start Angular dev server → http://localhost:4200
npm start

# Production build
npm run build

# Watch mode (incremental builds)
npm run watch
```

### Testing

```bash
# Run interaction + accessibility tests against a running Storybook
# Requires Storybook to be running first (npm run storybook)
npm run test-storybook

# Run Angular unit tests
npm test
```

### Docs (Compodoc)

Compodoc generates `documentation.json` which the Storybook Docs addon uses for API tables.

```bash
npx compodoc -p tsconfig.app.json --watch
```

---

## CI

Two GitHub Actions jobs run on every push and pull request:

| Job | What it does |
|---|---|
| **Interaction & Accessibility Tests** | Builds Storybook, serves it, runs `test-storybook` via Playwright |
| **Visual Tests (Chromatic)** | Sends snapshots to Chromatic for visual diffing |

To enable Chromatic, add a `CHROMATIC_PROJECT_TOKEN` secret in your GitHub repository settings (Settings → Secrets → Actions).

---

## Project structure

```
src/ds/               # All design system components
  avatar/
  button/
  checkbox/
  chip/
  ...
.storybook/           # Storybook configuration
  main.ts             # Addons, framework, story globs
  preview.ts          # Global decorators, parameters, theme
  theme.ts            # Custom Storybook UI theme
.github/workflows/
  storybook-tests.yml # CI pipeline
```

---

## Tech stack

- **Angular 21** — component framework
- **Storybook 10** — component documentation and development
- **@storybook/addon-a11y** — accessibility panel and automated checks
- **@chromatic-com/storybook** — visual regression testing via Chromatic
- **@storybook/test-runner** — runs `play` interaction tests via Playwright in CI
- **Vitest** — Angular unit tests
- **Compodoc** — API documentation generation
