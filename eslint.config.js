import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['dist', 'node_modules'],
    files: ['src/**/*.{ts,tsx}', 'tests/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../domain/legalRefs/*', '../domain/legalRefs/**'],
              message: "Import from '@/domain/legalRefs' via the domain barrel.",
            },
            {
              group: ['../domain/incident/*', '../domain/incident/**'],
              message: "Import from '@/domain/incident' via the domain barrel.",
            },
          ],
        },
      ],
    },
  },
];
