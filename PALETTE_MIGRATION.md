# Palette Migration — Old → New

**Status:** DRAFT, partial. The new Figma library is still being populated.
**Source of truth:** `CODE-A-TON - Library` (file `qp9zQivrKCg344QzQysWwN`, library key `lk-3de1768f...e621ee97`).
**Drafted:** 2026-04-21.

## How this draft was assembled

The new variable list comes from `search_design_system` queries against the
authoritative library. The MCP search caps results around 14–20 and uses fuzzy
matching, so this enumerates only what was visible in those windows. Anything
that does not appear here may simply not have been queried into view yet — it
is not a guarantee that the variable does not exist.

The old variable list comes from `src/ds/tokens/_primitives.scss` and
`src/ds/tokens/_semantic.scss` on `main`.

## 1 · New primitives confirmed in CODE-A-TON Library

Collection: **Primitives**

| Family   | Steps confirmed                       |
|----------|---------------------------------------|
| teal     | 50, 650, 700, 800                     |
| orange   | 75, 100, 200, 900                     |
| error    | 300, 700, 800, 900, 1000              |
| neutral  | 250, 300, 350, 400, 500, 600, 700     |

> **Gap:** No `warm`, `brand`, `info`, `accent`, `danger`, `caution`, `green`,
> `warning`, `ai`, `sunoh`, or `success` family steps surfaced in any query.
> Either they do not exist yet, or they exist but were below the search cap.

## 2 · New semantics confirmed in CODE-A-TON Library

Collection: **Semantics**

- `bg/error-button/{default,hover}`
- `border/error-button/{default,hover}`
- `text/error-button/default`
- `icon/error-button/default`
- `status/error/{bg,fg}`
- `status/warning/bg`
- `status/confirmation/bg`
- `bg/jellybean/yellow`
- `text/jellybean/yellow`
- `text/inverse`

## 3 · New components confirmed in CODE-A-TON Library

Collection: **Components**

- `button/{primary,secondary,error,warning,white,disabled}/bg/{default,hover}`
- `button/{primary,secondary,error,warning,white,disabled}/text/default`
- `card/body/text/{default,subtle}`
- `card/footer/text/{default,subtle}`
- `notification/body/text/default`
- `notification/title/text/default`

## 4 · Old → New mapping (proposed)

Mapping is best-effort based on family hue and role. Steps are aligned by
visual lightness; the old scale uses 5/10/20/…/100, the new scale uses
irregular numerics (50, 250, 300, 650, 700, 800, etc.), so most rows need
visual confirmation in Figma.

### 4.1 — Family rename (high-confidence)

| Old family            | New family | Notes                                                         |
|-----------------------|------------|---------------------------------------------------------------|
| `--color-user-*`      | `teal`     | New brand teal (#007b95-ish) replaces old user-blue (#0378a7) |
| `--color-admin-*`     | `orange`   | Hue is the same family                                        |
| `--color-secondary-*` | `neutral`  | Plain gray scale                                              |
| `--color-error-*`     | `error`    | Hue is the same family                                        |

### 4.2 — Family rename (NEEDS USER INPUT — no clean target yet)

| Old family            | Likely new family | Reason                                                  |
|-----------------------|-------------------|---------------------------------------------------------|
| `--color-warning-*`   | `caution` ?       | "caution" appeared in earlier session probes; not confirmed in current data |
| `--color-green-*`     | `confirmation` ?  | New library has `status/confirmation/*` semantics       |
| `--color-ai-*`        | `accent` ?        | "accent" appeared earlier; not confirmed in current data |
| `--color-sunoh-*`     | ?                 | No pink family found; **decision needed**               |

### 4.3 — Step alignment (proposed, per family)

Old steps go in 5-unit increments from 5→100 plus a `base`. New steps are
non-uniform. This rough alignment is by lightness only:

| Old step      | New step (proposed) | Confidence |
|---------------|---------------------|------------|
| `*-base-5`    | `50`                | medium     |
| `*-base-10`   | `100`               | medium (only `orange/100` confirmed) |
| `*-base-20`   | `200`               | medium     |
| `*-base-30`   | `250` or `300`      | low        |
| `*-base-40`   | `300` or `350`      | low        |
| `*-base-50`   | `400` or `500`      | low        |
| `*-base` / `60` | `600` or `650`    | low        |
| `*-base-70`   | `700`               | medium     |
| `*-base-80`   | `800`               | medium     |
| `*-base-90`   | `900`               | medium     |
| `*-base-100`  | `1000`              | medium (only `error/1000` confirmed) |

### 4.4 — Globals

| Old                | New                                                  |
|--------------------|------------------------------------------------------|
| `--color-white`    | `neutral/0` if it exists; else keep as primitive     |
| `--color-black`    | `neutral/1000` if it exists; else keep as primitive  |
| `--color-hover`    | unmapped — was a brand-tinted hover (#fbf3e6)        |
| `--color-select`   | unmapped — was a brand-tinted selected (#f7e7ce)     |

## 5 · Semantic-layer migration

**Confirmed: the new layer fully replaces the old one.** The old role-based
semantic tokens (`--color-text-*`, `--color-border-*`, `--color-icon-*`,
`--color-status-*`, `--color-surface-*`, `--focus-ring-*`, `--state-*`) all
go away. Components consume the new component-layer tokens (`button/*`,
`card/*`, `notification/*`, etc.) directly; the new semantic layer
(`bg/error-button/*`, `status/*`, `bg|text/jellybean/*`, `text/inverse`)
exists only to feed the component layer.

## 6 · Component-layer migration

The new component layer tokens map cleanly to existing component slots:

| New token                            | Maps to (old `_component.scss` token, approximate) |
|--------------------------------------|----------------------------------------------------|
| `button/primary/bg/{default,hover}`  | existing `--btn-primary-bg`, `--btn-primary-bg-hover` |
| `button/secondary/bg/*`              | `--btn-secondary-bg`, `--btn-secondary-bg-hover` |
| `button/error/bg/*`                  | new — old palette had no error-button variant   |
| `button/warning/bg/*`                | new                                              |
| `button/white/bg/*`                  | matches `--btn-tertiary-bg` (white-on-canvas)    |
| `button/disabled/bg/default`         | `--btn-disabled-bg`                              |
| `card/body/text/{default,subtle}`    | new                                              |
| `card/footer/text/{default,subtle}`  | new                                              |
| `notification/title/text/default`    | matches `--notification-title-color`             |
| `notification/body/text/default`     | matches `--notification-body-color`              |

## 7 · Open questions before migration can proceed

Per the user (2026-04-23): "there is a possibility everything comes back" —
the missing families (`sunoh`, `ai`, `warning`, `green`) may yet be added
to the Figma library. Until that's confirmed, treat them as **pending,
not deleted**. The questions below are tracking, not blockers.

1. **Pink/sunoh family** — pending. Don't drop Sunoh themes.
2. **AI/purple family** — pending. Don't drop AI themes/variants.
3. **Green/success family** — `status/confirmation/bg` exists; full ladder pending.
4. **Warning/yellow family** — `status/warning/bg` exists; full ladder pending.
5. **`--color-hover` and `--color-select`** — old global brand-tinted hover/select colors. Drop them?

## 8 · Per-component palette dependencies

This is what the per-component sweep in §9 step 5 actually has to cover.
Each row lists the public theme/color/variant input the component exposes
and which old families that translates to. **At risk** = the component
includes a value (`sunoh`, `ai`) that has no confirmed replacement family
in the new Figma palette.

| Component                    | Input        | Values                                                | Old families touched              | Status            |
|------------------------------|--------------|-------------------------------------------------------|-----------------------------------|-------------------|
| `ds-button`                  | `color`      | user, admin, secondary, success, error, sunoh         | user, admin, secondary, green, error, sunoh | **At risk: sunoh** |
| `ds-toggle-button-group`     | `color`      | user, admin, secondary, success, error, sunoh         | user, admin, secondary, green, error, sunoh | **At risk: sunoh** |
| `ds-toggle`                  | `theme`      | user, admin, green, sunoh                              | user, admin, green, sunoh         | **At risk: sunoh** |
| `ds-modal`                   | `theme`      | user, admin, green, sunoh, ai                          | user, admin, green, sunoh, ai     | **At risk: sunoh, ai** |
| `ds-loader`                  | `theme`      | user, admin, green, sunoh                              | user, admin, green, sunoh         | **At risk: sunoh** |
| `ds-notification`            | `theme`      | user, admin, green                                     | user, admin, green                | OK if `green`/`confirmation` lands |
| `ds-popover`                 | `theme`      | user, admin                                            | user, admin                       | OK                |
| `ds-floating-tabs`           | `theme`      | user, admin, green, sunoh (`TabTheme`)                 | user, admin, green, sunoh         | **At risk: sunoh** |
| `ds-standard-tabs`           | `theme`      | user, admin, green, sunoh (`TabTheme`)                 | user, admin, green, sunoh         | **At risk: sunoh** |
| `ds-header-tabs`             | `theme`      | user, admin, green, sunoh (`TabTheme`)                 | user, admin, green, sunoh         | **At risk: sunoh** |
| `ds-wizard-tabs`             | `theme`      | user, admin (`WizardTabTheme`)                         | user, admin                       | OK                |
| `ds-chip`                    | `state`      | default, active, error, warning, in-process, ai        | error, warning, secondary, ai     | **At risk: ai, warning** |
| `ds-disclaimer`              | `variant`    | disclaimer, ai-disclaimer                              | warning (border), ai (variant)    | **At risk: ai, warning** |
| `ds-avatar`                  | `variant`    | text, image, dummy                                     | (no palette coupling)             | OK                |
| `ds-left-nav`                | —            | uses `'admin'` only as a *nav-item key/label*, not a brand theme | secondary | OK |
| `ds-checkbox`, `ds-radio-button`, `ds-input-field`, `ds-breadcrumb`, `ds-info-tooltip`, `ds-tooltip`, `ds-table`, `ds-toast`, `ds-side-navigation`, `ds-top-nav`, `ds-patient-info`, `ds-icons`, `ds-typography`, `ds-page-header`, `ds-pagination`, `ds-panel`, `ds-scrollbar`, `ds-color`, `ds-components` | — | (no theme input; consume role/component tokens) | depends on whatever survives in semantics | OK once token files are rewritten |

### Components whose `.scss` references old families directly (bypassing the role layer)

These need targeted attention during the sweep — they call primitives by name:

- `src/ds/toggle-button/toggle-button-group.component.scss` — `--color-{user,admin,secondary,green,error,sunoh}-base/-5`
- `src/ds/disclaimer/disclaimer.component.scss` — `--color-warning-*` (and ai-disclaimer variant)
- `src/ds/loader/loader.component.scss` — `--loader-color-{green,sunoh}` (component tokens that resolve to green/sunoh primitives)
- `src/ds/tabs/header-tabs.component.scss` — old families
- `src/ds/tabs/wizard-tabs.component.scss` — old families
- `src/ds/typography/typography-specimen.component.scss` — color swatches for the docs page (uses every family)

## 9 · Migration plan (wholesale replacement)

Per the user, the new Figma layers replace the old code-side layers
entirely — no alias shims, no parallel families.

1. **Wait for the new Figma palette to be complete** (or get explicit
   sign-off that the current set is final).
2. **Rewrite `src/ds/tokens/_primitives.scss`** with only the new families
   and steps. Old families and old step ladder removed.
3. **Rewrite `src/ds/tokens/_semantic.scss`** with only the new semantic
   tokens, pointing at the new primitives.
4. **Rewrite `src/ds/tokens/_component.scss`** with only the new
   component-layer tokens (`button/*`, `card/*`, `notification/*`, …).
5. **Per-component sweep:** rewire each component's SCSS to consume the
   new component-layer tokens. **Do NOT delete `sunoh`, `ai`, or `warning`
   themes from the public types yet** — per the user, there is a real
   possibility those families come back in the Figma library. For each
   "At risk" theme value, the SCSS still needs *some* color binding so
   stories don't render unstyled; until the matching family lands in
   Figma, leave the existing color reference in place inside a clearly
   marked `// LEGACY: pending Figma family` block.
6. **Update stories** to drop dead theme columns/rows from `Overview` and
   `Themes` stories (Toggle, Modal, Loader, Tabs, Button, etc.).
7. **Visual QA** in Storybook before merge.

This will be a single coordinated rewrite, not the per-branch upgrade
pattern used for the 20-component queue — because every component depends
on the same three token files at once.
