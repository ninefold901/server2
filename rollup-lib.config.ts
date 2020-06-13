import { terser } from "rollup-plugin-terser";
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'lib/index.ts',
    output: {
        file: 'lib/output.js',
        format: 'cjs'
    },
    external: [
        'path',
        'fs',
        './type',
        './auto-code',
        '../config/config.default'
    ],
    plugins: [
        typescript({
            module: 'es6'
        }),
        terser()
    ]
};
