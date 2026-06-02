import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/ds-angularjs/public-api.ts',

  // angular (AngularJS 1.x) is provided by the consuming app — never bundle it
  external: ['angular'],

  plugins: [
    resolve({ browser: true }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.angularjs.json',
      // Declarations are emitted by the post-build tsc step; skip here.
      // outDir must be inside the rollup output dir — point at dist to satisfy validation.
      declaration: false,
      declarationMap: false,
      outDir: 'dist/ecw-ds-angularjs',
    }),
  ],

  output: [
    // CommonJS — for Node / older bundlers
    {
      file: 'dist/ecw-ds-angularjs/index.cjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    // ESM — tree-shakeable, for modern bundlers
    {
      file: 'dist/ecw-ds-angularjs/esm/index.js',
      format: 'esm',
      sourcemap: true,
    },
    // UMD — for direct <script> inclusion in AngularJS apps
    {
      name: 'ecwDsAngularjs',
      file: 'dist/ecw-ds-angularjs/bundles/ecw-ds-angularjs.umd.js',
      format: 'umd',
      globals: { angular: 'angular' },
      sourcemap: true,
      exports: 'named',
    },
  ],
};
