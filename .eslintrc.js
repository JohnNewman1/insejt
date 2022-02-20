module.exports = {
    root: true,
    extends: [
      'eslint:recommended',
      'preact',
      'plugin:@typescript-eslint/recommended',
    ],
    env: {
      browser: true,
      es2021: true,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      indent: [2, 'tab', { SwitchCase: 1, VariableDeclarator: 1 }],
      'no-tabs': 0,
      'react/prop-types': 0,
      'react/jsx-indent': [2, 'tab'],
      'react/jsx-indent-props': [2, 'tab']
    },
    overrides: [
      {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: [
          '@typescript-eslint',
        ],
        extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          project: ['./tsconfig.json'],
        },
      },
    ],
  };