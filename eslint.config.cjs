const globals = require('globals');
const js = require('@eslint/js');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
    {
        // https://eslint.org/docs/latest/use/configure/ignore
        // Add patterns here, or use globalIgnores(['dist/', ...]) from 'eslint/config'.
        ignores: [
        ]
    },

    js.configs.recommended,

    {
        name: 'project/main',
        files: [
            '**/*.js',
            '**/*.cjs',
            '**/*.cts',
            '**/*.mjs',
            '**/*.mts',
            '**/*.ts'
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'commonjs',
            globals: {
                // Node.js environment globals
                ...globals.node
            }
        },

        linterOptions: {
            reportUnusedDisableDirectives: 'error',
            reportUnusedInlineConfigs: 'error'
        },

        rules: {
            'indent': ['error', 4, {'SwitchCase': 1}],
            'linebreak-style': ['error', 'unix'],
            'no-var': 'error',
            'prefer-const': 'error',
            'semi': ['error', 'always']
        }
    }
]);
