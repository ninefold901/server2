import typescript from '@rollup/plugin-typescript';

export default {
    input: 'lib/auto-plugin.ts',
    output: {
        file: 'plugin/basic.js',
        format: 'cjs'
    },
    external: ['../model'],
    plugins: [
        typescript({
            module: 'es6',
        }),
    ]
};
