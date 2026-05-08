# Design Tokens

Source of truth: **Figma — CODE-A-TON Library** (`qp9zQivrKCg344QzQysWwN`).

Sync flow:

```
Figma Variables
    ↓ Gitfig plugin (commit + push)
tokens/tokens.json  ← W3C DTCG format
    ↓ Style Dictionary (style-dictionary.config.mjs)
src/ds/tokens/_primitives.generated.scss
    ↓ Imported by tokens/index.scss
Component SCSS uses var(--color-*)
```

## Designer setup (Figma side)

1. Install **[Gitfig](https://gitfig.com/)** plugin in Figma.
2. Run plugin → "Connect GitHub" → Device Flow auth.
3. Configure repo:
   - **Repository:** `divyansh98sharma/design-system`
   - **Branch:** `tokens/sync` (long-lived; PR opens against `main`)
   - **Path:** `tokens/tokens.json`
   - **Format:** W3C DTCG
4. Map Figma Variable collections to token paths (one-time).
5. To publish: stage changes in Gitfig → "Commit & Push" → CI opens PR.

## Developer commands

```bash
# Build SCSS from tokens.json
npm run tokens:build

# Watch mode (regenerate on edit)
npm run tokens:watch
```

## Format

W3C Design Tokens Community Group spec. Each token:

```json
"color.user.base": {
  "$value": "#0378a7",
  "$type": "color",
  "$description": "Optional"
}
```

Reference another token via `{path.to.token}`:

```json
"color.brand.primary": { "$value": "{color.user.base}", "$type": "color" }
```

## Output

- `src/ds/tokens/_primitives.generated.scss` — auto-generated, do **not** edit by hand.
- `src/ds/tokens/_semantic.scss` — hand-written intent layer; references generated primitives.
- `src/ds/tokens/_component.scss` — hand-written component tokens; reference semantic.

## Naming convention

Style Dictionary outputs CSS custom properties as `--{category}-{path}`:

| Token path                | CSS variable             |
|---------------------------|--------------------------|
| `color.user.base`         | `--color-user-base`      |
| `color.user.base-50`      | `--color-user-base-50`   |
| `spacing.4`               | `--spacing-4`            |
| `radius.pill`             | `--radius-pill`          |
| `font-size.12`            | `--font-size-12`         |

This namespacing eliminates the legacy collision in `_primitives.scss` (`--12` reused
across font-size/spacing/radius).

## CI

`.github/workflows/tokens-sync.yml` runs on push to `tokens/sync`:

1. Install deps
2. Run `npm run tokens:build`
3. Commit generated SCSS if changed
4. Open PR to `main` (label: `design-tokens`)
