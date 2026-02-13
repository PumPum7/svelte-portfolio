import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';

export default [
	// Global ignores
	{
		ignores: [
			'**/dist/**',
			'**/node_modules/**',
			'**/.astro/**',
			'**/build/**',
			'**/.svelte-kit/**',
			'**/package/**',
			'**/*.config.{js,mjs,cjs,ts}',
			'**/.DS_Store',
			'**/.env',
			'**/.env.*',
			'!**/.env.example',
			'**/pnpm-lock.yaml',
			'**/package-lock.json',
			'**/bun.lock',
			'**/bun.lockb'
		]
	},
	// Base JavaScript/TypeScript config
	js.configs.recommended,
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module'
			},
			globals: {
				fetch: 'readonly',
				Request: 'readonly',
				Response: 'readonly',
				Headers: 'readonly',
				FormData: 'readonly',
				URL: 'readonly',
				URLSearchParams: 'readonly'
			}
		},
		plugins: {
			'@typescript-eslint': typescript
		},
		rules: {
			...typescript.configs.recommended.rules,
			// TypeScript already handles symbol resolution and unused analysis.
			'no-undef': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			]
		}
	},
	// Astro files
	...astro.configs.recommended,
	{
		files: ['**/*.astro'],
		languageOptions: {
			parserOptions: {
				parser: typescriptParser
			}
		}
	},
	// Svelte files
	...svelte.configs['flat/recommended'],
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: typescriptParser,
				extraFileExtensions: ['.svelte']
			},
			globals: {
				window: 'readonly',
				document: 'readonly',
				navigator: 'readonly',
				console: 'readonly',
				HTMLElement: 'readonly',
				Element: 'readonly',
				Node: 'readonly',
				Event: 'readonly',
				CustomEvent: 'readonly'
			}
		},
		plugins: {
			'@typescript-eslint': typescript
		},
		rules: {
			// Core JS rules mis-handle Svelte/TS syntax and ambient browser symbols.
			'no-undef': 'off',
			'no-unused-vars': 'off',
			// Keep signal as warnings while migrating Astro/Svelte templates.
			'svelte/require-each-key': 'warn',
			'svelte/no-at-html-tags': 'warn'
		}
	},
	{
		files: ['src/pages/api/**/*.{ts,js,mjs,cjs}'],
		languageOptions: {
			globals: {
				Buffer: 'readonly',
				console: 'readonly',
				process: 'readonly'
			}
		}
	},
	// Prettier integration
	prettier
];
