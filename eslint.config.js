import storybook from 'eslint-plugin-storybook'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier/recommended'
import unusedImports from 'eslint-plugin-unused-imports'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
	js.configs.recommended,
	eslintConfigPrettier,
	storybook.configs['flat/recommended'],
	...tseslint.configs.recommended,

	{
		files: ['**/*.{ts,tsx,js}'],
		ignores: ['**/dist/**', '**/node_modules/**'],
		extends: [prettier],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'unused-imports': unusedImports,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'@typescript-eslint/consistent-type-imports': 'warn',
			'react-hooks/exhaustive-deps': 'off',
			'prettier/prettier': 'warn',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-empty-object-type': 'warn',
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
			'sort-imports': [
				'error',
				{
					ignoreDeclarationSort: true,
				},
			],
		},
	},
)
