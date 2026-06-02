#!/usr/bin/env node
/**
 * scripts/bulk-generate-angularjs.mjs
 *
 * Generates AngularJS 1.x directives for all Angular 21 components in src/ds/.
 * Delegates to scripts/generate-angularjs.mjs for each component so every
 * component gets the same multi-provider AI fallback chain.
 *
 * Uses only Node.js built-ins — no npm install required.
 *
 * Usage:
 *   node scripts/bulk-generate-angularjs.mjs
 *   node scripts/bulk-generate-angularjs.mjs --dry-run
 *   node scripts/bulk-generate-angularjs.mjs --components button,chip,toggle
 *   node scripts/bulk-generate-angularjs.mjs --resume      # skip already-generated
 *   node scripts/bulk-generate-angularjs.mjs --resume --components avatar,table
 *
 * Exit codes:  0 = all succeeded   1 = one or more failed
 */

import { readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';
import { spawnSync } from 'child_process';

// ─── Config ──────────────────────────────────────────────────────────────────

const EXCLUDED_DIRS = new Set(['tokens', 'docs', 'icons', 'color', 'typography']);
const DS_DIR  = 'src/ds';
const AJS_DIR = 'src/ds-angularjs';

// ─── Parse args ───────────────────────────────────────────────────────────────

const rawArgs = process.argv.slice(2);

const DRY_RUN = rawArgs.includes('--dry-run');
const RESUME  = rawArgs.includes('--resume');

const compIdx = rawArgs.indexOf('--components');
const TARGET_COMPONENTS = compIdx !== -1
  ? rawArgs[compIdx + 1]?.split(',').map(s => s.trim()).filter(Boolean)
  : null; // null = all

// ─── Preflight ────────────────────────────────────────────────────────────────

const GENERATE_SCRIPT = 'scripts/generate-angularjs.mjs';
if (!existsSync(GENERATE_SCRIPT)) {
  console.error(`❌  ${GENERATE_SCRIPT} not found.`);
  console.error(`    This script depends on Branch 4 (feat/angularjs-ai-action).`);
  console.error(`    Merge PR #284 into main before running bulk generate.\n`);
  process.exit(1);
}

// ─── Discover components ──────────────────────────────────────────────────────

function allComponentDirs() {
  if (!existsSync(DS_DIR)) {
    console.error(`❌  ${DS_DIR} not found — run from the repo root.`);
    process.exit(1);
  }
  return readdirSync(DS_DIR).filter(name => {
    if (EXCLUDED_DIRS.has(name)) return false;
    return statSync(join(DS_DIR, name)).isDirectory();
  });
}

const allComponents   = allComponentDirs();
const queueComponents = TARGET_COMPONENTS
  ? TARGET_COMPONENTS.filter(c => {
      if (!allComponents.includes(c)) {
        console.warn(`  ⚠️   Unknown component "${c}" — skipping`);
        return false;
      }
      return true;
    })
  : allComponents;

// ─── Apply --resume filter ────────────────────────────────────────────────────

function directiveExists(component) {
  return existsSync(join(AJS_DIR, component, `${component}.directive.ts`));
}

let skipped = [];
let queue = queueComponents;

if (RESUME) {
  skipped = queueComponents.filter(directiveExists);
  queue   = queueComponents.filter(c => !directiveExists(c));
}

// ─── Summary header ───────────────────────────────────────────────────────────

const DIVIDER = '─'.repeat(60);

console.log(`\n🚀  AngularJS Bulk Generate`);
console.log(DIVIDER);
console.log(`    Total components : ${allComponents.length}`);
console.log(`    Queue            : ${queue.length}${RESUME ? ` (${skipped.length} already exist — skipped)` : ''}`);
if (DRY_RUN) console.log(`    Mode             : --dry-run (no files will be written)`);
if (TARGET_COMPONENTS) console.log(`    Filter           : ${TARGET_COMPONENTS.join(', ')}`);
console.log();

if (queue.length === 0) {
  console.log('  ✅  Nothing to generate. Use without --resume to regenerate existing files.');
  process.exit(0);
}

// ─── Generate each component ─────────────────────────────────────────────────

const results = { passed: [], failed: [] };
const startTime = Date.now();

for (let i = 0; i < queue.length; i++) {
  const component = queue[i];
  const prefix = `[${i + 1}/${queue.length}]`;

  console.log(`${DIVIDER}`);
  console.log(`${prefix}  ${component}`);
  console.log();

  const args = ['scripts/generate-angularjs.mjs', component];
  if (DRY_RUN) args.push('--dry-run');

  const result = spawnSync('node', args, {
    stdio: 'inherit',   // stream output to parent terminal in real time
    env: process.env,   // propagate all API key env vars
  });

  if (result.status === 0) {
    results.passed.push(component);
    console.log();
  } else {
    results.failed.push(component);
    console.error(`  ❌  ${component} failed (exit ${result.status ?? 'signal'})\n`);
  }
}

// ─── Final report ─────────────────────────────────────────────────────────────

const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

console.log(`\n${DIVIDER}`);
console.log(`📊  Results  (${elapsed}s)\n`);

if (results.passed.length)  console.log(`  ✅  Passed  (${results.passed.length}): ${results.passed.join(', ')}`);
if (skipped.length)         console.log(`  ⏭   Skipped (${skipped.length}): ${skipped.join(', ')}`);
if (results.failed.length)  console.log(`  ❌  Failed  (${results.failed.length}): ${results.failed.join(', ')}`);

console.log();

const allDone = results.passed.length + skipped.length === allComponents.length;

if (results.failed.length === 0) {
  if (allDone) {
    console.log('  🎉  All 24 components generated! You can now enable --strict in check-mirror.yml.');
    console.log(`       Uncomment the --strict line in .github/workflows/check-mirror.yml\n`);
  } else {
    console.log('  ✅  Batch complete with no failures.');
  }
  process.exit(0);
} else {
  console.log(`  ⚠️   ${results.failed.length} component(s) failed. Re-run with:`);
  console.log(`       node scripts/bulk-generate-angularjs.mjs --components ${results.failed.join(',')} --resume\n`);
  process.exit(1);
}
