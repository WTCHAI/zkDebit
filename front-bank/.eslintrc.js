/* eslint-disable no-undef */
const config = {
  parser: '@typescript-eslint/parser',
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', ',tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', ',tsx', '.d.ts'],
      },
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
  plugins: ['@typescript-eslint', 'import', 'react', 'react-hooks'],
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:@next/next/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'import/no-named-as-default': 'off',
    'react/jsx-sort-props': 'error',
    'no-empty': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
        pathGroups: [
          {
            pattern: '@libs/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@contexts/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@helpers/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@components/**',
            group: 'internal',
            position: 'before',
          },
        ],
      },
    ],
  },
}

module.exports = config
