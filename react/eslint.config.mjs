// eslint.config.mjs
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import react from 'eslint-plugin-react';
import _import from 'eslint-plugin-import';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import jest from 'eslint-plugin-jest';
import prettier from 'eslint-plugin-prettier';
import security from 'eslint-plugin-security';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...fixupConfigRules(
        compat.extends(
            'eslint:recommended',
            'plugin:import/errors',
            'plugin:react/recommended',
            'plugin:jsx-a11y/recommended',
            'plugin:prettier/recommended'
        )
    ),
    {
        plugins: {
            react: fixupPluginRules(react),
            import: fixupPluginRules(_import),
            'jsx-a11y': fixupPluginRules(jsxA11Y),
            jest,
            prettier: fixupPluginRules(prettier),
            security: fixupPluginRules(security),
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...jest.environments.globals.globals,
            },
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'react/prop-types': 'warn',
            indent: ['error', 4],
            'linebreak-style': 'off',
            quotes: ['error', 'single'],
            'no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            'security/detect-object-injection': 'warn',
            'security/detect-unsafe-regex': 'warn',
            'security/detect-eval-with-expression': 'warn',
            'security/detect-non-literal-fs-filename': 'warn',
            'security/detect-non-literal-require': 'warn',
        },
    },
];
