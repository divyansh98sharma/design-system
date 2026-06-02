## What changed

<!-- One-line summary of what this PR does. -->

## Why

<!-- Context: ticket, Figma link, or brief rationale. -->

---

## Checklist

### General
- [ ] Ran `npm run build` locally (or `build:lib:angularjs` for AngularJS-only changes)
- [ ] No console errors or TypeScript errors
- [ ] Relevant stories updated / added in `.stories.ts`
- [ ] Tokens added to `_component.scss` if new CSS custom properties were introduced

---

### AngularJS mirror  _(skip if this PR touches only docs, tokens, or CI)_

> The AngularJS package (`src/ds-angularjs/`) must stay an exact mirror of the Angular 21 package (`src/ds/`).  
> The `check-mirror` CI job enforces this automatically — this checklist is the human side.

**If you added or changed an Angular 21 component:**
- [ ] Corresponding `src/ds-angularjs/<component>/<component>.directive.ts` created / updated
- [ ] All new `@Input()` bindings have a matching `'<'` scope key in the directive
- [ ] All new `@Output()` bindings have a matching `'&'` scope key (`buttonClick` → `onButtonClick`)
- [ ] Component is imported and registered in `src/ds-angularjs/public-api.ts`

**If you changed CSS / SCSS:**
- [ ] Same visual change reflected in the AngularJS directive's template / styles
- [ ] Token variables (`var(--...)`) used — no hardcoded hex values

**If you bumped the version in `package.json`:**
- [ ] `package-angularjs.json` version updated to match  
  _(the post-build script syncs the `dist/` copy automatically, but the source file must be updated for PRs)_

**Parity check:**
- [ ] `node scripts/check-mirror.mjs` exits 0 locally before pushing

---

### Reviewer notes

<!-- Anything the reviewer should pay special attention to. -->
