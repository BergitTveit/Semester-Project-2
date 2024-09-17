import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    {
        ignores: ['**/*config.mjs', '**/*config.js', 'cypress/**/*.mjs', 'cypress/**/*.js'],
        files: ['**/*.js', '**/*.mjs'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.cypress,
                ...globals.jest,
                ...globals.node,
            },
        },
        ...pluginJs.configs.recommended,
    },
    {
        files: ['*.config.js', 'postcss.config.js', 'tailwind.config.js'],
        languageOptions: {
            globals: globals.node,
        },
        rules: {},
    },
];

// import globals from 'globals';
// import pluginJs from '@eslint/js';

// export default [
//     {
//         ignores: ['**/*config.mjs', '**/*config.js', 'cypress/**/*.mjs', 'cypress/**/*.js'],
//         files: ['**/*.js', '**/*.mjs'],
//         languageOptions: {
//             globals: { ...globals.browser, ...globals.cypress },
//         },
//         ...pluginJs.configs.recommended,
//     },
//     {
//         files: ['*.config.js', 'postcss.config.js', 'tailwind.config.js'],
//         languageOptions: {
//             globals: globals.node,
//         },
//         rules: {},
//     },
// ];
