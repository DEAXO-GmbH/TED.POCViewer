import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

import pkg from './package.json';


const externalPackages = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
];
const regexesOfPackages = externalPackages.map(packageName => new RegExp(`^${packageName}(/.*)?`));


export default {
    preserveModules: true,
    input: './src/package/index.ts',
    output: {
        dir: 'dist',
        format: 'es',
        preserveModules: true,
        preserveModulesRoot: 'src/package/'
    },
    external: regexesOfPackages,
    plugins: [
        postcss({
            extract: true,
        }),
        babel({
            babelHelpers: 'runtime',
            exclude: 'node_modules/**',
        }),
        commonjs(),
        resolve({
            browser: false,
        }),
        typescript(),
        generatePackageJson({
            baseContents: {
                name: '@DEAXO-GmbH/ted-dxf',
                version: '0.1.0',
                publishConfig: {
                    registry: 'https://npm.pkg.github.com',
                },
                repository: 'github.com:DEAXO-GmbH/TED.dxf.git',
            }
        }),
        json(),
    ],
};
