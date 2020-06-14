import typescript from '@rollup/plugin-typescript';

export default {
    input: 'lib/auto-plugin.ts',
    output: {
        file: 'plugin/basic.js',
        format: 'cjs'
    },
    external: ['../model', '../config/config.default'],
    plugins: [
        typescript({
            module: 'es6',
        }),
    ]
};
