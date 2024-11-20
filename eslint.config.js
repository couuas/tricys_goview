import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },
  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      'node_modules/',
      'public/',
      'es/',
      'lib/',
      'dist/',
      'package.json',
      'src/assets/',
      'plop-templates/',
      'handlebars/',
      'website/',
      'build/'
    ]
  },
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormatting,
  {
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-unused-vars': 'off',
      'vue/no-unused-vars': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/valid-template-root': 'off',
      'vue/no-mutating-props': 'off',

      // TODO: 下面的规则后续放开，然后自动修复
      'no-var': 'off',
      'prefer-const': 'off',
      'vue/no-ref-as-operand': 'off',
      'vue/block-lang': 'off',
      'vue/no-dupe-keys': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      '@typescript-eslint/no-unnecessary-type-constraint': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-duplicate-enum-values': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-imports': 'error'
    }
  }
]
