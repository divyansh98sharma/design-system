# eCW Design System

Angular component library and CSS token system for eClinicalWorks products.

## Rules — always follow these

- **Always** use design system components instead of building custom ones
- **Always** use CSS tokens (`var(--token-name)`) for colors, spacing, and typography
- **Never** hardcode hex values, pixel sizes, or font stacks
- **Never** import token files inside a component's SCSS — import once in `styles.scss` only
- **Never** use primitive tokens (`--color-blue-500`) in product code — use semantic tokens
- **Never** add `margin` to `:host` — layout is the consumer's responsibility
- When a component PR is opened, update `replit.md` if the component API changed

## Install

```bash
npm install @divyansh98sharma/design-system
```

Configure `.npmrc` in the consuming project:
```
@divyansh98sharma:registry=https://npm.pkg.github.com
```

## Token setup — once in global styles

```scss
/* styles.scss */
@use 'node_modules/@divyansh98sharma/design-system/tokens/index';
```

## Import components

All components are standalone. Import directly into any `@Component` or `@NgModule`.

```typescript
import { ButtonComponent, ChipComponent } from '@divyansh98sharma/design-system';

@Component({
  standalone: true,
  imports: [ButtonComponent, ChipComponent],
  template: `<ds-button label="Save"></ds-button>`
})
```

---

## Component reference

### ATOMS

**`ds-button`**
```html
<ds-button
  [label]="'Save'"
  [type]="'primary'"      <!-- primary | secondary | white | error | warning -->
  [size]="'md'"           <!-- sm | md | lg -->
  [btnStyle]="'default'"  <!-- default | divided -->
  [disabled]="false"
  [iconOnly]="false"
  [alertIndicator]="false"
  [counter]="null"
  (buttonClick)="onSave()">
</ds-button>
```

**`ds-input-field`**
```html
<ds-input-field
  [label]="'Search'"
  [placeholder]="'Type here'"
  [alignment]="'vertical'"  <!-- vertical | horizontal -->
  [required]="false"
  [disabled]="false"
  [supportText]="''"
  [errorText]="''"
  (valueChange)="onChange($event)">
</ds-input-field>
```

**`ds-checkbox`**
```html
<ds-checkbox
  [label]="'Accept terms'"
  [checked]="false"
  [indeterminate]="false"
  [disabled]="false"
  (checkedChange)="onCheck($event)">
</ds-checkbox>
```

**`ds-radio-button`**
```html
<ds-radio-button
  [label]="'Option A'"
  [value]="'a'"
  [model]="selected"
  [name]="'group'"
  [disabled]="false"
  (modelChange)="selected = $event">
</ds-radio-button>
```

**`ds-toggle`**
```html
<ds-toggle
  [on]="false"
  [theme]="'user'"   <!-- user | admin | green | sunoh -->
  [disabled]="false"
  (onToggle)="onToggle($event)">
</ds-toggle>
```

**`ds-chip`**
```html
<ds-chip
  [label]="'Filter'"
  [state]="'default'"
  <!-- default | filter | input | suggestion | action | icon-only | ai
       status-success | status-warning | status-error | status-info | status-neutral -->
  [showBadge]="true"
  [showIcon]="true"
  [showClose]="true"
  (chipClick)="onClick()"
  (closed)="onClose()">
</ds-chip>
```

**`ds-avatar`**
```html
<ds-avatar
  [variant]="'text'"   <!-- text | image | dummy -->
  [size]="'sm'"        <!-- sm | lg -->
  [initials]="'MN'"
  [imageUrl]="''"
  [imageAlt]="''">
</ds-avatar>
```

**`ds-tooltip`**
```html
<ds-tooltip
  [text]="'Helpful hint'"
  [position]="'top-left'"  <!-- top-left | top-right | bottom-left | bottom-right -->
  [visible]="false">
</ds-tooltip>
```

**`ds-info-tooltip`**
```html
<ds-info-tooltip [text]="'More info'"></ds-info-tooltip>
```

**`ds-loader`**
```html
<ds-loader
  [theme]="'user'"     <!-- user | admin | green | sunoh -->
  [showLabel]="false"
  [label]="'Loading…'">
</ds-loader>
```

**`ds-scrollbar`**
```html
<ds-scrollbar [orientation]="'vertical'">  <!-- vertical | horizontal -->
  <!-- content -->
</ds-scrollbar>
```

---

### MOLECULES

**`ds-disclaimer`**
```html
<ds-disclaimer
  [variant]="'disclaimer'"      <!-- disclaimer | ai-disclaimer -->
  [text]="'Info text'"
  [labelPosition]="'left'"      <!-- left | top -->
  (closed)="onClose()">
</ds-disclaimer>
```

**`ds-notification`**
```html
<ds-notification
  [type]="'confirmation'"   <!-- communication | confirmation | warning | error -->
  [theme]="'user'"          <!-- user | admin | green -->
  [windowName]="'Window'"
  [description]="'Message'"
  [actions]="[{ label: 'OK' }]">
</ds-notification>
```

**`ds-toast`**
```html
<ds-toast
  [type]="'confirmation'"   <!-- confirmation | communication -->
  [windowName]="'Window'"
  [description]="'Done'"
  [showUndo]="false"
  (closed)="onClose()"
  (undoClick)="onUndo()">
</ds-toast>
```

**`ds-popover`**
```html
<ds-popover
  [title]="'Options'"
  [theme]="'user'"           <!-- user | admin -->
  [notch]="'bottom-right'"
  [fields]="[]"
  [checkboxes]="[]"
  [radios]="[]">
</ds-popover>
```

**`ds-breadcrumb`**
```html
<ds-breadcrumb
  [items]="[{ label: 'Home', route: '/' }, { label: 'Patients' }]"
  [type]="'breadcrumb'"   <!-- breadcrumb | navigation -->
  [level]="1">            <!-- 1 | 2 | 3 | 4 -->
</ds-breadcrumb>
```

**`ds-toggle-button-group`**
```html
<ds-toggle-button-group
  [items]="[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }]"
  [selected]="'day'"
  [size]="'md'">   <!-- sm | md | lg -->
</ds-toggle-button-group>
```

---

### ORGANISMS

**`ds-modal`**
```html
<ds-modal
  [heading]="'Confirm action'"
  [theme]="'user'"    <!-- user | admin | green | sunoh | ai -->
  [size]="'medium'"   <!-- small | medium | large | xlarge | xxlarge -->
  [footerRightActions]="[{ label: 'Confirm', variant: 'primary' }]"
  [footerLeftActions]="[{ label: 'Cancel', variant: 'secondary' }]"
  (closed)="onClose()"
  (actionClick)="onAction($event)">
  <!-- body via ng-content -->
</ds-modal>
```

**`ds-table`**
```html
<ds-table
  [columns]="columns"
  [rows]="data"
  [totalRows]="100"
  [pageSize]="10"
  (sortChange)="onSort($event)"
  (pageChange)="onPage($event)">
</ds-table>
```

**`ds-standard-tabs`** / **`ds-floating-tabs`** / **`ds-header-tabs`**
```html
<ds-standard-tabs
  [tabs]="[{ key: 'summary', label: 'Summary' }, { key: 'notes', label: 'Notes' }]"
  [activeTab]="'summary'"
  [theme]="'user'"   <!-- user | admin | green | sunoh -->
  (tabChange)="onTab($event)">
</ds-standard-tabs>
```

**`ds-wizard-tabs`**
```html
<ds-wizard-tabs
  [steps]="[{ key: 's1', label: 'Patient Info', required: true }]"
  [activeStep]="'s1'"
  [theme]="'user'"
  (stepChange)="onStep($event)">
</ds-wizard-tabs>
```

**`ds-top-nav`** / **`ds-left-nav`** / **`ds-side-navigation`** — pass `[links]` or `[items]` arrays; see Storybook for full shape.

---

## Most-used tokens

```css
/* Brand */
var(--color-user-base)        /* #0378a7 — primary interactive */
var(--color-admin-base)       /* Admin theme */

/* Status */
var(--color-status-success)
var(--color-status-error)
var(--color-status-warning)
var(--color-status-info)

/* Text */
var(--color-text-primary)     /* Body text on white */
var(--color-text-muted)       /* Secondary / supporting */

/* Borders & surfaces */
var(--color-border-default)   /* 1px borders */
var(--color-surface-default)  /* Page background */
var(--color-surface-hover)    /* Hover state background */

/* Typography */
var(--font-size-12)
var(--font-size-14)           /* Base body size */
var(--font-size-16)

/* Radius */
var(--radius-sm)
var(--radius-md)              /* Standard corner radius */
var(--radius-lg)
```

## Storybook reference

Run `npm run storybook` or visit the hosted Chromatic URL to browse all components interactively with live controls.
