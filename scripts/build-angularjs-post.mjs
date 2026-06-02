/**
 * Post-build script for @divyansh98sharma/design-system-angularjs
 *
 * Runs after rollup to:
 * 1. Emit TypeScript declarations (tsc --emitDeclarationOnly)
 * 2. Write dist/ecw-ds-angularjs/package.json with version synced from root
 * 3. Copy src/ds/tokens/ → dist/ecw-ds-angularjs/tokens/  (shared with Angular 21)
 */

import { readFileSync, writeFileSync, cpSync, mkdirSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const DIST = './dist/ecw-ds-angularjs';

// ─── 1. Declarations ─────────────────────────────────────────────────────────
console.log('▶ Emitting TypeScript declarations…');
execSync('tsc -p tsconfig.angularjs.json --emitDeclarationOnly', {
  stdio: 'inherit',
});

// ─── 2. Package manifest — version always synced from root package.json ──────
console.log('▶ Writing package.json…');
const rootPkg   = JSON.parse(readFileSync('./package.json',             'utf8'));
const ajsPkg    = JSON.parse(readFileSync('./package-angularjs.json',   'utf8'));

ajsPkg.version = rootPkg.version;   // single source of truth for the version

mkdirSync(DIST, { recursive: true });
writeFileSync(`${DIST}/package.json`, JSON.stringify(ajsPkg, null, 2) + '\n');

// ─── 3. Tokens (SCSS) ────────────────────────────────────────────────────────
console.log('▶ Copying token SCSS files…');
const tokensSrc  = './src/ds/tokens';
const tokensDest = `${DIST}/tokens`;

if (existsSync(tokensSrc)) {
  cpSync(tokensSrc, tokensDest, { recursive: true });
}

console.log(`\n✅  @divyansh98sharma/design-system-angularjs v${rootPkg.version} built → ${DIST}\n`);
