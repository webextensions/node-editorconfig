const globals = require('globals');
const js = require('@eslint/js');

module.exports = [
    {
        // https://eslint.org/docs/latest/use/configure/ignore
        ignores: [
        ]
    },

    js.configs.recommended,

    {
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
            sourceType: 'module',
            globals: {
                // Node.js environment globals
                ...globals.node
            }
        },

        rules: {
            'indent': ['error', 4, {'SwitchCase': 1}],
            'linebreak-style': ['error', 'unix'],
            'no-var': 'error',
            'prefer-const': 'error',
            'semi': ['error', 'always']
        }
    }
];
