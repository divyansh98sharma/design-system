# Design System

Angular 21 component library with design tokens, Storybook documentation, accessibility testing, and visual regression via Chromatic.

---

## Table of contents

- [Getting started](#getting-started)
- [Development setup](#development-setup)
- [Commands](#commands)
- [Project structure](#project-structure)
- [Tech stack](#tech-stack)
- [Contributing](#contributing)
- [Deprecation policy](#deprecation-policy)
- [CI](#ci)
- [Releasing](#releasing)

---

## Getting started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 22+ |
| npm | 11+ |
| Angular CLI | 21+ |

### 1 — Clone and install

```bash
git clone https://github.com/divyansh98sharma/design-system.git
cd design-system
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` is required because `@storybook/test-runner` has not yet released a version declaring compatibility with Storybook 10.

### 2 — Import design tokens

Add the token stylesheet to your application's global styles. Tokens are CSS custom properties on `:root` — primitives, semantic aliases, and component-scoped variables all in one import.

```scss
/* styles.scss */
@use 'path/to/design-system/src/ds/tokens/index';
```

Or via `angular.json`:

```json
"styles": ["src/ds/tokens/index.scss"]
```

Once imported, every token is available globally:

```scss
.my-element {
  color: var(--color-user-base);
  font-size: var(--font-size-14);
  border-radius: var(--radius-md);
}
```

### 3 — Use a component

All components are standalone Angular 21 components. Import them directly into any `@Component` or `NgModule` imports array.

```typescript
import { ButtonComponent } from './ds/button/button.component';

@Component({
  selector: 'app-my-feature',
  standalone: true,
  imports: [ButtonComponent],
  template: `<ds-button label="Save" type="primary"></ds-button>`,
})
export class MyFeatureComponent {}
```

### Token quick reference

Always use **semantic tokens** in product code — never primitive tokens directly.

| Category | Token | Value |
|----------|-------|-------|
| Brand blue | `--color-user-base` | Primary interactive colour |
| Success | `--color-status-success` | Positive state |
| Error | `--color-status-error` | Destructive / error state |
| Warning | `--color-status-warning` | Caution state |
| Text primary | `--color-text-primary` | Body text on white |
| Text muted | `--color-text-muted` | Secondary / supporting text |
| Border | `--color-border-default` | Standard 1px border |
| Font size | `--font-size-14` | Base body font (14px) |
| Radius | `--radius-md` | Standard corner radius |

See **Foundations → Color Palette** and **Foundations → Typography** in Storybook for the full reference.

---

## Development setup

```bash
# Start Storybook dev server → http://localhost:6006
npm run storybook

# Start Angular app → http://localhost:4200
npm start
```

Compodoc generates `documentation.json` for Storybook's API tables. Run it once before starting Storybook if the file is stale:

```bash
npx compodoc -p tsconfig.app.json --watch
```

---

## Commands

### Storybook

```bash
npm run storybook          # dev server
npm run build-storybook    # static build
npm run test-storybook     # interaction + a11y tests (requires storybook running)
```

### Angular

```bash
npm start                  # dev server
npm run build              # production build
npm run watch              # incremental watch build
npm test                   # unit tests
```

### Design tokens

```bash
npm run tokens:build       # compile Style Dictionary tokens
npm run tokens:watch       # watch mode
npm run tokens:clean       # remove generated files
```

---

## Project structure

```
src/ds/                        # Design system components
  avatar/
  button/
  checkbox/
  chip/
  ...each component has .component.ts, .component.html, .component.scss, .stories.ts

src/ds/tokens/
  _primitives.scss             # Raw values (do not use directly)
  _primitives.generated.scss   # Style Dictionary output
  _semantic.scss               # Intent-based aliases from primitives
  _component.scss              # Component-scoped tokens
  _typography.scss             # Type scale
  _deprecated.scss             # Deprecated token aliases (removed in next major)
  index.scss                   # Single import entry point

src/ds/docs/                   # Storybook documentation pages (MDX)

.storybook/
  main.ts                      # Addons, framework, story globs
  preview.ts                   # Global decorators, sort order, deprecation banner
  theme.ts                     # Custom Storybook UI theme

.github/workflows/
  storybook-tests.yml          # Interaction, a11y, and Chromatic tests
  tokens-sync.yml              # Token pipeline
```

---

## Tech stack

| Tool | Purpose |
|------|---------|
| **Angular 21** | Component framework |
| **Storybook 10** | Component docs and development |
| **@storybook/addon-a11y** | Accessibility panel and axe-core checks |
| **@chromatic-com/storybook** | Visual regression via Chromatic |
| **@storybook/test-runner** | Runs `play` interaction tests in CI via Playwright |
| **Vitest** | Angular unit tests |
| **Style Dictionary** | Token pipeline (design → CSS custom properties) |
| **Compodoc** | API documentation generation |

---

## Contributing

### PR workflow

1. **Branch from main** — use the naming convention below
2. **Build and write stories** — Playground + all variants + at least one `play` interaction test
3. **Check accessibility** — open every story → Accessibility tab, fix all red violations
4. **Open a PR** — CI runs Chromatic visual regression; review snapshot diffs and accept intended changes
5. **Merge** — after review and Chromatic approval, squash-merge into main

### Branch naming

| Type | Pattern | Example |
|------|---------|---------|
| New component | `feat/component-name` | `feat/date-picker` |
| Bug fix | `fix/description` | `fix/button-focus-ring` |
| Token update | `chore/token-name` | `chore/palette-tokens` |
| Documentation | `docs/section-name` | `docs/storybook-sections` |
| CI / infra | `ci/description` | `ci/dependabot-auto-merge` |

### New component checklist

- [ ] Standalone component with `ChangeDetectionStrategy.OnPush`
- [ ] All `@Input()` names match Figma property names exactly
- [ ] Component tokens added to `_component.scss` under the component's section
- [ ] No hardcoded hex values or pixel values — all from tokens
- [ ] `:host` sets `display: inline-flex` or `display: block`; no external margins
- [ ] `.stories.ts` includes Playground + all variants + at least one `play` test
- [ ] Storybook Accessibility tab passes with zero violations
- [ ] Keyboard navigation works (Tab, Enter/Space, arrow keys where applicable)
- [ ] Icon-only interactions have `aria-label`
- [ ] Component exported from the public API

### Component file structure

```
src/ds/my-component/
├── my-component.component.ts      # Angular component
├── my-component.component.html    # Template
├── my-component.component.scss    # Scoped styles (component tokens only)
└── my-component.stories.ts        # Storybook stories
```

### Token conventions

```scss
/* naming: component — property — variant — state */
--button-primary-bg
--button-primary-bg-hover
--chip-ai-border-color
```

Always alias through the semantic layer — never use a primitive value as a component token default.

---

## Deprecation policy

Nothing is removed without a warning period. The lifecycle for any component, token, or API is:

```
Still works → Minor version (deprecated, warning added) → Major version (removed)
```

There is always at least one minor version between deprecation and removal.

### Deprecating a component

```typescript
/**
 * @deprecated since v2.1 — use NewButtonComponent instead.
 * Will be removed in v3.0.
 */
@Component({ selector: 'ds-old-button', ... })
export class OldButtonComponent { }
```

Add `'deprecated'` to the story's `tags` array — Storybook shows an amber banner on the canvas:

```typescript
const meta: Meta<OldButtonComponent> = {
  title: 'Atoms/Old Button',
  tags: ['autodocs', 'deprecated'],
};
```

### Deprecating a token

Move the token from `_component.scss` to `_deprecated.scss`, redirecting to the replacement:

```scss
/* _deprecated.scss */
:root {
  /* @deprecated v2.1 — use --chip-bg-neutral */
  --chip-bg-default: var(--chip-bg-neutral);
}
```

Consumers continue to compile and render correctly until the major version removes the alias.

### Deprecating a prop

```typescript
/** @deprecated since v2.2 — use btnStyle */
@Input() set style(value: string) {
  this.btnStyle = value as ButtonStyle;
}
```

### Currently deprecated

| Type | Name | Since | Replacement | Removes in |
|------|------|-------|-------------|------------|
| — | No deprecations yet | — | — | — |

---

## CI

Two GitHub Actions jobs run on every push and pull request to `main`:

| Job | What it does |
|-----|-------------|
| **Interaction & Accessibility Tests** | Builds Storybook, serves it, runs `test-storybook` via Playwright |
| **Visual Tests (Chromatic)** | Sends snapshots to Chromatic for visual diffing |

To enable Chromatic, add a `CHROMATIC_PROJECT_TOKEN` secret in **Settings → Secrets → Actions**.

---

## Releasing

The library is published to the **public npm registry** as
[`@sharma-divyansh/eclinicalworks`](https://www.npmjs.com/package/@sharma-divyansh/eclinicalworks).
Anyone can install it with no authentication:

```bash
npm install @sharma-divyansh/eclinicalworks
```

Publishing is automated via **npm Trusted Publishing (OIDC)** — there is **no
npm token to manage or rotate**. The `.github/workflows/publish.yml` workflow
runs whenever a GitHub **Release** is published, builds the library with
ng-packagr, and publishes it (with build provenance) using a short-lived OIDC
credential trusted by npm.

### Cutting a release

> **The one rule:** bump the version *before* tagging. npm publishes the
> `version` field from `package.json` (not the git tag), and a version can
> never be republished — so every release starts with a version bump.

1. **Bump the version** on `main`:

   ```bash
   npm version patch --no-git-tag-version   # 1.0.1 -> 1.0.2 (use minor / major as needed)
   ```

   Commit and merge it to `main` (semver: `patch` = fixes, `minor` = new
   components/features, `major` = breaking changes).

2. **Publish a GitHub Release** with a matching tag:

   ```bash
   gh release create v1.0.2 --target main --title "v1.0.2" --generate-notes
   ```

   …or via the UI: **Releases → Draft new release → choose tag `v1.0.2` → Publish release**.

3. **Done.** The workflow builds and publishes automatically (~1–2 min). Verify:

   ```bash
   npm view @sharma-divyansh/eclinicalworks version
   ```

### Notes

- **No local publishing.** Do not run `npm publish` by hand and do not put an
  npm token in `~/.npmrc` — OIDC handles authentication in CI.
- **Trusted Publisher config** lives on npmjs.com (package → *Settings →
  Trusted Publisher*): repository `divyansh98sharma/design-system`, workflow
  `publish.yml`. It must match the workflow for OIDC to succeed.
- **If a release fails**, check `gh run list --workflow=publish.yml`. The most
  common cause is forgetting step 1 (the version already exists) — bump and
  release again.
