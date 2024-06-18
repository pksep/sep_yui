module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
    '@vue/eslint-config-typescript/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'no-unsafe-optional-chaining': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'no-var': 'error',
    'prefer-const': 'warn',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
        singleQuote: true,
        trailingComma: 'none',
        tabWidth: 2,
        useTabs: false,
        printWidth: 80,
        semi: true,
        bracketSpacing: true,
        arrowParens: 'avoid'
      }
    ],
    'vue/no-dupe-keys': [
      'warn',
      {
        groups: []
      }
    ],
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'any',
          normal: 'any',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
};
