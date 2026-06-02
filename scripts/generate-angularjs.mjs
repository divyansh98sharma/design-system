#!/usr/bin/env node
/**
 * scripts/generate-angularjs.mjs
 *
 * Generates an AngularJS 1.x directive from an Angular 21 standalone component.
 * Uses only Node.js built-ins + native fetch (Node 18+) — no npm install required.
 *
 * Provider chain (first available key wins):
 *   1. Anthropic    — ANTHROPIC_API_KEY   (claude-sonnet-4-6)
 *   2. OpenAI       — OPENAI_API_KEY      (gpt-4o)
 *   3. Google       — GOOGLE_API_KEY      (gemini-2.0-flash)
 *   4. GitHub       — GITHUB_TOKEN        (gpt-4o-mini, always set in Actions — free)
 *   5. Groq         — GROQ_API_KEY        (llama-3.3-70b-versatile)
 *
 * Usage:
 *   node scripts/generate-angularjs.mjs <component>
 *   node scripts/generate-angularjs.mjs button
 *   node scripts/generate-angularjs.mjs chip --dry-run   # print to stdout, no writes
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';

// ─── Args ─────────────────────────────────────────────────────────────────────

const [, , COMPONENT, ...flags] = process.argv;
const DRY_RUN = flags.includes('--dry-run');

if (!COMPONENT) {
  console.error('Usage: node scripts/generate-angularjs.mjs <component-name> [--dry-run]');
  process.exit(1);
}

// ─── Paths ────────────────────────────────────────────────────────────────────

const DS_DIR     = `src/ds/${COMPONENT}`;
const AJS_DIR    = `src/ds-angularjs/${COMPONENT}`;
const NG_TS_FILE = `${DS_DIR}/${COMPONENT}.component.ts`;
const NG_HTML    = `${DS_DIR}/${COMPONENT}.component.html`;
const NG_SCSS    = `${DS_DIR}/${COMPONENT}.component.scss`;
const OUT_FILE   = `${AJS_DIR}/${COMPONENT}.directive.ts`;
const PUBLIC_API = 'src/ds-angularjs/public-api.ts';

// ─── Read source ──────────────────────────────────────────────────────────────

if (!existsSync(NG_TS_FILE)) {
  console.error(`❌  Angular 21 component not found: ${NG_TS_FILE}`);
  console.error(`    Run this script from the repo root.`);
  process.exit(1);
}

const ngSource   = readFileSync(NG_TS_FILE, 'utf8');
const htmlSource = existsSync(NG_HTML) ? readFileSync(NG_HTML, 'utf8') : null;
const scssSource = existsSync(NG_SCSS) ? readFileSync(NG_SCSS, 'utf8') : null;

// ─── System prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `\
You are an expert AngularJS 1.x developer. Your job is to convert Angular 21 standalone components into equivalent AngularJS 1.x directives for a dual-framework design system.

## Output rules
- Return ONLY valid TypeScript source code — no markdown, no code fences, no explanation
- The output must compile with @types/angular and TypeScript strict mode
- Do not include trailing text after the last closing statement

## File structure
Every directive file must follow this exact pattern:

\`\`\`typescript
import * as angular from 'angular';
import { EcwDsModule } from '../public-api';

// Optional: type aliases that mirror the Angular component's exported types
// export type MyType = '...' | '...';

EcwDsModule.directive('dsComponentName', (): angular.IDirective => ({
  restrict: 'E',
  scope: { ... },
  // controller only when you need $sce, $watch, or computed state
  template: \`...\`,
}));
\`\`\`

## Scope binding rules
- Every @Input() property → isolated scope key with binding '<' (one-way, same name)
  @Input() label = 'Button'  →  label: '<'
- Every @Output() EventEmitter → isolated scope key with binding '&'
  - If the name ALREADY starts with 'on': keep as-is  →  onToggle: '&'
  - Otherwise: prefix with 'on' + capitalise first letter
    buttonClick  →  onButtonClick: '&'
    closed       →  onClosed: '&'
- @Input() with a setter that sanitizes HTML → still use '<' binding; handle in controller with $sce
- @ContentChild and inject() patterns → omit from scope (they are Angular-specific)

## Template rules
- Use Angular → AngularJS directive equivalents:
  [ngClass]="..."     → ng-class="..."
  *ngIf="..."         → ng-if="..."
  *ngFor="..."        → ng-repeat="..."
  [(ngModel)]="..."   → ng-model="..."
  (click)="..."       → ng-click="..."
  [disabled]="..."    → ng-disabled="..."
  [innerHTML]="..."   → ng-bind-html="..."  (requires $sce.trustAsHtml in controller)
  {{ expr }}          → {{ expr }}  (same)
- Preserve ALL BEM CSS class names exactly as they appear in the Angular template/component
- CSS custom property tokens (var(--...)) work identically — no changes needed

## Controller pattern (use when needed)
Use a controller when the directive needs:
- $sce.trustAsHtml() for sanitized HTML inputs (icon SVGs, etc.)
- $scope.$watch() for derived/computed values
- Local state that updates on input changes

\`\`\`typescript
controller: ['$scope', '$sce', function(
  $scope: angular.IScope & MyControllerScope,
  $sce: angular.ISCEService,
) {
  $scope.$watch('icon', (val: string) => {
    $scope.safeIcon = val ? $sce.trustAsHtml(val) : '';
  });
}],
\`\`\`

## Concrete example

### Angular 21 input (toggle.component.ts):
\`\`\`typescript
export type ToggleTheme = 'user' | 'admin' | 'green' | 'sunoh';

@Component({ selector: 'ds-toggle', ... })
export class ToggleComponent {
  @Input() on = false;
  @Input() theme: ToggleTheme = 'user';
  @Input() disabled = false;
  @Output() onToggle = new EventEmitter<boolean>();

  handleChange(event: { checked: boolean }): void {
    this.on = event.checked;
    this.onToggle.emit(event.checked);
  }

  get hostClasses(): Record<string, boolean> {
    return {
      'ds-toggle': true,
      [\`ds-toggle--\${this.theme}\`]: true,
      'ds-toggle--disabled': this.disabled,
    };
  }
}
\`\`\`

### Angular 21 template (toggle.component.html):
\`\`\`html
<div [ngClass]="hostClasses">
  <label class="p-toggleswitch"
         [class.p-toggleswitch-checked]="on"
         [class.p-disabled]="disabled">
    <div style="border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;">
      <input type="checkbox" role="switch"
             [(ngModel)]="on"
             [disabled]="disabled"
             (ngModelChange)="handleChange({checked: $event})" />
    </div>
    <span class="p-toggleswitch-slider"></span>
  </label>
</div>
\`\`\`

### Expected AngularJS output (toggle.directive.ts):
\`\`\`typescript
import * as angular from 'angular';
import { EcwDsModule } from '../public-api';

export type ToggleTheme = 'user' | 'admin' | 'green' | 'sunoh';

EcwDsModule.directive('dsToggle', (): angular.IDirective => ({
  restrict: 'E',
  scope: {
    on:       '<',
    theme:    '<',
    disabled: '<',
    onToggle: '&',
  },
  template: \`
    <div ng-class="{
      'ds-toggle': true,
      ('ds-toggle--' + (theme || 'user')): true,
      'ds-toggle--disabled': disabled
    }">
      <label class="p-toggleswitch"
             ng-class="{'p-toggleswitch-checked': on, 'p-disabled': disabled}">
        <div style="border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;">
          <input type="checkbox" role="switch"
                 ng-model="on"
                 ng-disabled="disabled"
                 ng-change="onToggle({ $value: on })" />
        </div>
        <span class="p-toggleswitch-slider"></span>
      </label>
    </div>
  \`,
}));
\`\`\`

Key observations from the example:
- 'onToggle' kept as-is (already has 'on' prefix)
- ng-class object syntax with dynamic key via string concatenation
- ng-change calls the '&' binding with named argument { $value: on }
- No controller needed — no HTML sanitization, no complex derived state
`;

// ─── User prompt ──────────────────────────────────────────────────────────────

const sections = [
  `Convert the following Angular 21 component to an AngularJS 1.x directive.\n`,
  `## ${COMPONENT}.component.ts\n\`\`\`typescript\n${ngSource}\n\`\`\``,
];
if (htmlSource) sections.push(`## ${COMPONENT}.component.html\n\`\`\`html\n${htmlSource}\n\`\`\``);
if (scssSource) sections.push(`## ${COMPONENT}.component.scss (reference — same tokens work in AngularJS)\n\`\`\`scss\n${scssSource}\n\`\`\``);
sections.push(`\nOutput ONLY the TypeScript source for ${COMPONENT}.directive.ts — no markdown, no fences, no explanation.`);

const USER_PROMPT = sections.join('\n\n');

// ─── Extract TypeScript from AI response ──────────────────────────────────────

function extractTypeScript(text) {
  // Strip markdown code fences if the model added them despite instructions
  const fenced = text.match(/```(?:typescript|ts)?\n([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();
  return text.trim();
}

// ─── Provider: Anthropic ──────────────────────────────────────────────────────

async function callAnthropic() {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('ANTHROPIC_API_KEY not set');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: USER_PROMPT }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Anthropic ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.content[0].text;
}

// ─── Provider: OpenAI-compatible (OpenAI / GitHub Models / Groq) ──────────────

async function callOpenAICompat(baseUrl, model, apiKey) {
  if (!apiKey) throw new Error(`API key not set for ${baseUrl}`);

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user',   content: USER_PROMPT },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${baseUrl} ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.choices[0].message.content;
}

// ─── Provider: Google Gemini ──────────────────────────────────────────────────

async function callGemini() {
  const key = process.env.GOOGLE_API_KEY;
  if (!key) throw new Error('GOOGLE_API_KEY not set');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ parts: [{ text: USER_PROMPT }] }],
      generationConfig: { maxOutputTokens: 4096, temperature: 0.2 },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gemini ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

// ─── Provider chain ───────────────────────────────────────────────────────────

const PROVIDERS = [
  {
    name: 'Anthropic (claude-sonnet-4-6)',
    enabled: !!process.env.ANTHROPIC_API_KEY,
    call: callAnthropic,
  },
  {
    name: 'OpenAI (gpt-4o)',
    enabled: !!process.env.OPENAI_API_KEY,
    call: () => callOpenAICompat('https://api.openai.com/v1', 'gpt-4o', process.env.OPENAI_API_KEY),
  },
  {
    name: 'Google Gemini (gemini-2.0-flash)',
    enabled: !!process.env.GOOGLE_API_KEY,
    call: callGemini,
  },
  {
    name: 'GitHub Models (gpt-4o-mini)',
    enabled: !!process.env.GITHUB_TOKEN,
    call: () => callOpenAICompat(
      'https://models.inference.ai.azure.com',
      'gpt-4o-mini',
      process.env.GITHUB_TOKEN,
    ),
  },
  {
    name: 'Groq (llama-3.3-70b-versatile)',
    enabled: !!process.env.GROQ_API_KEY,
    call: () => callOpenAICompat(
      'https://api.groq.com/openai/v1',
      'llama-3.3-70b-versatile',
      process.env.GROQ_API_KEY,
    ),
  },
];

// ─── Update public-api.ts ─────────────────────────────────────────────────────

function updatePublicApi() {
  if (!existsSync(PUBLIC_API)) {
    console.warn(`  ⚠️   ${PUBLIC_API} not found — add the import manually once the scaffold PR merges.`);
    return;
  }

  const current = readFileSync(PUBLIC_API, 'utf8');
  const importLine = `import './${COMPONENT}/${COMPONENT}.directive';`;

  if (current.includes(importLine)) {
    console.log(`  ℹ️   public-api.ts already imports ${COMPONENT}`);
    return;
  }

  // Insert after the EcwDsModule declaration line
  const moduleDecl = current.indexOf('export const EcwDsModule');
  if (moduleDecl === -1) {
    // Fallback: append at end
    writeFileSync(PUBLIC_API, current.trimEnd() + `\n${importLine}\n`);
  } else {
    const eol = current.indexOf('\n', moduleDecl);
    const updated =
      current.slice(0, eol + 1) +
      `${importLine}\n` +
      current.slice(eol + 1);
    writeFileSync(PUBLIC_API, updated);
  }

  console.log(`  ✅  Updated ${PUBLIC_API}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log(`\n🤖  Generating AngularJS directive for: ${COMPONENT}`);
console.log(`    Source: ${NG_TS_FILE}${htmlSource ? ` + ${NG_HTML}` : ''}${scssSource ? ` + ${NG_SCSS}` : ''}`);
console.log(`    Output: ${OUT_FILE}${DRY_RUN ? ' (dry run — no writes)' : ''}\n`);

let generated = null;
let usedProvider = null;

for (const provider of PROVIDERS) {
  if (!provider.enabled) {
    console.log(`  ⏭  ${provider.name} — key not set, skipping`);
    continue;
  }
  try {
    console.log(`  🔄  Trying ${provider.name}...`);
    const raw = await provider.call();
    generated = extractTypeScript(raw);
    usedProvider = provider.name;
    console.log(`  ✅  Generated via ${provider.name}`);
    break;
  } catch (err) {
    console.warn(`  ⚠️   ${provider.name} failed: ${err.message}`);
  }
}

if (!generated) {
  console.error('\n❌  All providers exhausted. Set at least one API key:\n');
  console.error('    ANTHROPIC_API_KEY  OPENAI_API_KEY  GOOGLE_API_KEY  GROQ_API_KEY');
  console.error('    (GITHUB_TOKEN is always available in GitHub Actions)\n');
  process.exit(1);
}

if (DRY_RUN) {
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`Generated by: ${usedProvider}`);
  console.log(`${'─'.repeat(60)}\n`);
  console.log(generated);
  console.log();
} else {
  mkdirSync(AJS_DIR, { recursive: true });
  writeFileSync(OUT_FILE, generated + '\n');
  console.log(`  ✅  Written: ${OUT_FILE}`);
  updatePublicApi();
  console.log(`\n✨  Done. Review ${OUT_FILE} before merging.`);
  console.log(`    Run: node scripts/check-mirror.mjs  to verify parity.\n`);
}
