import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Allow apostrophes in JSX text (normal English)
      'react/no-unescaped-entities': 'off',
      // Prefix with _ to suppress unused-var warnings
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // Allow `any` in complex existing WebGL/gesture code — warn only
      '@typescript-eslint/no-explicit-any': 'warn',
      // Dynamic imports use `module` as variable name — allow
      '@next/next/no-assign-module-variable': 'off',
      // Remaining img tags are in complex animation contexts where next/image
      // would break the layout — acceptable trade-off
      '@next/next/no-img-element': 'warn',
      'prefer-const': 'warn',
    },
  },
];

export default eslintConfig;
