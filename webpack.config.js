import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

export default {
    entry: './src/package/index.ts',
    mode: 'production',
    output: {
        path: resolve(dirname(fileURLToPath(import.meta.url)), 'dist'),
        filename: '[name].js',
        library: {
            name: 'ted-dxf',
            type: 'umd',
            export: 'ted-dxf'
        },
        libraryTarget: 'umd',
        globalObject: 'typeof self !== \'undefined\' ? self : this',
    },
    resolve: {
        extensions: ['.ts', '.tsx','.js']
    },
    externals: {
        'react': 'react',
    },
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.m?js/,
                type: 'javascript/auto',
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.json$/,
                use: ['json-loader']
            },
            {
                test: /\.dxf$/,
                use: ['file-loader']
            },
            {
                test: /\.css$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: (file) => {
                            const rootPath = resolve(dirname(fileURLToPath(import.meta.url)));
                            const distPath = rootPath + '/src/package';
                            const filePath = file.slice(distPath.length);
                            console.log('=>', filePath);

                            return filePath;
                        }
                    }
                },
            }
        ]
    }
};
