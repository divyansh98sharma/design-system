#!/usr/bin/env node
/**
 * scripts/check-mirror.mjs
 *
 * Validates three parity invariants between the Angular 21 and AngularJS packages.
 * Uses only Node.js built-ins — no npm install required in CI.
 *
 * Checks:
 *   1. VERSION SYNC   — package.json and package-angularjs.json at the same version  [always blocks]
 *   2. COVERAGE       — every component in src/ds/ has a counterpart in src/ds-angularjs/
 *                       [warn-only by default; blocking with --strict]
 *   3. API PARITY     — when both sides exist, @Input()/@Output() names match scope bindings
 *                       [always blocks when a component exists on both sides]
 *
 * Usage:
 *   node scripts/check-mirror.mjs           # warn on missing coverage, block on API mismatch
 *   node scripts/check-mirror.mjs --strict  # block on missing coverage too (enable after Branch 5)
 *
 * Exit codes:  0 = all checks passed   1 = one or more checks failed
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

// ─── Config ──────────────────────────────────────────────────────────────────

const STRICT = process.argv.includes('--strict');

// Folders inside src/ds/ that are NOT consumable components (docs, tokens, visual-only)
const EXCLUDED_DS_DIRS = new Set([
  'tokens', 'docs', 'icons',
  'color',      // color-palette — docs only, not exported
  'typography', // typography-specimen — docs only, not exported
]);

const DS_DIR     = 'src/ds';
const AJS_DIR    = 'src/ds-angularjs';
const ROOT_PKG   = 'package.json';
const AJS_PKG    = 'package-angularjs.json';

// ─── Result tracking ─────────────────────────────────────────────────────────

const errors   = [];   // blocking failures
const warnings = [];   // non-blocking notices
const passes   = [];   // items that passed

function pass(msg)  { passes.push(msg); }
function warn(msg)  { warnings.push(msg); }
function fail(msg)  { errors.push(msg); }

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readJson(path) {
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf8'));
}

function componentDirs(baseDir) {
  if (!existsSync(baseDir)) return [];
  return readdirSync(baseDir).filter(name => {
    if (EXCLUDED_DS_DIRS.has(name)) return false;
    return statSync(join(baseDir, name)).isDirectory();
  });
}

/**
 * Extract @Input() property names from an Angular 21 component TypeScript file.
 * Handles:  @Input() name   and   @Input({ required: true }) name
 */
function extractInputs(source) {
  const inputs = [];
  const re = /@Input\s*(?:\([^)]*\))?\s+(\w+)\s*[=:!?]/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    inputs.push(m[1]);
  }
  return inputs;
}

/**
 * Extract @Output() property names from an Angular 21 component TypeScript file.
 */
function extractOutputs(source) {
  const outputs = [];
  const re = /@Output\s*(?:\([^)]*\))?\s+(\w+)\s*[=]/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    outputs.push(m[1]);
  }
  return outputs;
}

/**
 * Extract all scope binding keys from an AngularJS directive TypeScript file.
 * Looks for  scope: { key: '<'  key: '&'  key: '@'  key: '=' }
 */
function extractScopeKeys(source) {
  // Find the scope object literal
  const scopeMatch = source.match(/scope\s*:\s*\{([^}]*)\}/s);
  if (!scopeMatch) return null; // directive has no isolated scope (might be OK for some)

  const keys = [];
  const re = /(\w+)\s*:\s*['"][<&@=]['"]/g;
  let m;
  while ((m = re.exec(scopeMatch[1])) !== null) {
    keys.push(m[1]);
  }
  return keys;
}

/**
 * Convert an Angular 21 @Output() name to the expected AngularJS scope key.
 * Convention: prefix with 'on' + capitalise first letter.
 * e.g.  buttonClick  →  onButtonClick
 *       closed       →  onClosed
 *       checkedChange →  onCheckedChange
 */
function toAjsOutputKey(outputName) {
  if (outputName.startsWith('on')) return outputName; // already prefixed
  return 'on' + outputName.charAt(0).toUpperCase() + outputName.slice(1);
}

// ─── Check 1: Version sync ───────────────────────────────────────────────────

function checkVersionSync() {
  const rootPkg = readJson(ROOT_PKG);
  const ajsPkg  = readJson(AJS_PKG);

  if (!rootPkg) { fail(`${ROOT_PKG} not found`); return; }
  if (!ajsPkg)  {
    warn(
      `${AJS_PKG} not found — AngularJS scaffold (feat/angularjs-scaffold) not yet merged.\n` +
      `  Version sync will be enforced once the scaffold PR lands.`
    );
    return;
  }

  const rv = rootPkg.version;
  const av = ajsPkg.version;

  if (rv === av) {
    pass(`Version sync: both packages at v${rv}`);
  } else {
    fail(
      `Version mismatch: ${ROOT_PKG} is v${rv} but ${AJS_PKG} is v${av}.\n` +
      `  Fix: update package-angularjs.json "version" to "${rv}".\n` +
      `  (The post-build script syncs this automatically during build — ` +
      `  update the source file for PRs that bump the version.)`
    );
  }
}

// ─── Check 2: Coverage ───────────────────────────────────────────────────────

function checkCoverage() {
  const ds21   = componentDirs(DS_DIR);
  const ajsDirs = new Set(componentDirs(AJS_DIR));

  const missing = ds21.filter(c => !ajsDirs.has(c));
  const extra   = [...ajsDirs].filter(c => !ds21.includes(c));

  const total   = ds21.length;
  const covered = total - missing.length;

  if (missing.length === 0) {
    pass(`Coverage: all ${total} components mirrored`);
  } else {
    const msg =
      `Coverage: ${covered}/${total} components mirrored.\n` +
      `  Missing AngularJS counterparts (${missing.length}):\n` +
      missing.map(c => `    • ${c}`).join('\n');

    if (STRICT) {
      fail(msg);
    } else {
      warn(
        msg +
        '\n  ℹ  Running in warn-only mode. Add --strict once all components exist (Branch 5).'
      );
    }
  }

  if (extra.length > 0) {
    warn(
      `Extra AngularJS folders with no Angular 21 counterpart:\n` +
      extra.map(c => `  • ${c}`).join('\n') +
      '\n  These will become errors if you removed a component from src/ds/.'
    );
  }
}

// ─── Check 3: API parity ─────────────────────────────────────────────────────

function checkApiParity() {
  const ds21    = componentDirs(DS_DIR);
  const ajsDirs = new Set(componentDirs(AJS_DIR));

  // Only check components that exist on BOTH sides
  const bothSides = ds21.filter(c => ajsDirs.has(c));

  if (bothSides.length === 0) {
    pass('API parity: no components on both sides yet — nothing to check');
    return;
  }

  let parityErrors = 0;

  for (const component of bothSides) {
    const ng21File = join(DS_DIR,  component, `${component}.component.ts`);
    const ajsFile  = join(AJS_DIR, component, `${component}.directive.ts`);

    if (!existsSync(ng21File)) {
      warn(`  ${component}: cannot find ${ng21File} — skipping API check`);
      continue;
    }
    if (!existsSync(ajsFile)) {
      fail(`  ${component}: src/ds-angularjs/${component}/${component}.directive.ts is missing`);
      parityErrors++;
      continue;
    }

    const ng21Source = readFileSync(ng21File, 'utf8');
    const ajsSource  = readFileSync(ajsFile,  'utf8');

    const ng21Inputs  = extractInputs(ng21Source);
    const ng21Outputs = extractOutputs(ng21Source);
    const scopeKeys   = extractScopeKeys(ajsSource);

    if (scopeKeys === null) {
      warn(
        `  ${component}: AngularJS directive has no isolated scope — ` +
        `verify this is intentional (wrapper directives are OK, leaf components are not)`
      );
      continue;
    }

    const scopeSet = new Set(scopeKeys);
    const componentErrors = [];

    // Every @Input() must appear as a '<' binding
    for (const input of ng21Inputs) {
      if (!scopeSet.has(input)) {
        componentErrors.push(`@Input() "${input}" missing from scope`);
      }
    }

    // Every @Output() must appear as an '&' binding (with 'on' prefix convention)
    for (const output of ng21Outputs) {
      const expected = toAjsOutputKey(output);
      if (!scopeSet.has(expected)) {
        componentErrors.push(
          `@Output() "${output}" → expected scope key "${expected}" not found`
        );
      }
    }

    if (componentErrors.length > 0) {
      fail(
        `API parity failure — ${component}:\n` +
        componentErrors.map(e => `    ✗ ${e}`).join('\n')
      );
      parityErrors++;
    } else {
      const inputCount  = ng21Inputs.length;
      const outputCount = ng21Outputs.length;
      pass(
        `API parity OK — ${component} ` +
        `(${inputCount} input${inputCount !== 1 ? 's' : ''}, ` +
        `${outputCount} output${outputCount !== 1 ? 's' : ''})`
      );
    }
  }
}

// ─── Run all checks ──────────────────────────────────────────────────────────

const DIVIDER = '─'.repeat(60);

console.log(`\n🔍  AngularJS Mirror Parity Check`);
console.log(DIVIDER);
if (STRICT) console.log('⚑  Running in --strict mode (coverage is blocking)\n');

checkVersionSync();
checkCoverage();
checkApiParity();

// ─── Report ──────────────────────────────────────────────────────────────────

console.log();
if (passes.length)   passes.forEach(p   => console.log(`  ✅  ${p}`));
if (warnings.length) warnings.forEach(w => console.log(`\n  ⚠️   ${w}`));
if (errors.length)   errors.forEach(e   => console.log(`\n  ❌  ${e}`));

console.log(`\n${DIVIDER}`);

const status =
  errors.length > 0
    ? `FAIL  (${errors.length} error${errors.length !== 1 ? 's' : ''}, ${warnings.length} warning${warnings.length !== 1 ? 's' : ''})`
    : warnings.length > 0
    ? `PASS with warnings  (${warnings.length} warning${warnings.length !== 1 ? 's' : ''})`
    : `PASS`;

console.log(`Result: ${status}\n`);

process.exit(errors.length > 0 ? 1 : 0);
