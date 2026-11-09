// @ts-check
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores([
    '**/node_modules/**',
    '**/.next/**',
    '**/out/**',
    '**/dist/**',
    '**/coverage/**',
    '**/playwright-report/**',
    '**/test-results/**',
    'packages/data/raw/**',
    'apps/web/public/data/**',
    'apps/web/public/workers/**',
    'apps/web/next-env.d.ts',
  ]),

  // Nền tảng: JS + TypeScript (không dùng type-aware rules để lint nhanh; tsc đã lo phần kiểu)
  js.configs.recommended,
  tseslint.configs.recommended,

  // Quy tắc chung cho mọi file TS
  {
    files: ['**/*.{ts,tsx,mts,mjs}'],
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-console': ['warn', { allow: ['debug', 'warn', 'error'] }],
      'no-debugger': 'warn',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
    },
  },

  // React (rules of hooks + các rule của React Compiler trong react-hooks v7) và Next.js
  {
    files: ['apps/web/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat['recommended-latest']],
    plugins: { '@next/next': nextPlugin },
    languageOptions: { globals: globals.browser },
    settings: { next: { rootDir: 'apps/web' } },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // Code chạy bằng Node: script dữ liệu, test, file cấu hình (được dùng console)
  {
    files: [
      'packages/data/scripts/**',
      'apps/web/scripts/**',
      '**/test/**',
      '**/e2e/**',
      '**/*.config.{ts,mjs,js}',
    ],
    languageOptions: { globals: globals.node },
    rules: { 'no-console': 'off' },
  },

  // Tắt mọi rule về định dạng: phần đó do Prettier đảm nhiệm (phải đứng cuối)
  prettierConfig,
]);
