import storybook from 'eslint-plugin-storybook';
import eslint from '@eslint/js';
import eslintConfigPrettier from '@vue/eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
  eslintConfigPrettier,
  { ignores: ['*.d.ts', '**/coverage', '**/dist'] },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs['flat/recommended'],
    ],
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {
      'vue/max-attributes-per-line': 'off',
      // Prettier rules
      'prettier/prettier': ['error', { printWidth: 120, singleQuote: true, trailingComma: 'all', semi: true }],
    },
  },
  storybook.configs['flat/recommended'],
);
