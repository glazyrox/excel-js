const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    }];

    if (isDev) {
        loaders.push('eslint-loader');
    }

    return loaders;
};

module.exports = {
    context: path.resolve(__dirname, './src'), // мейн путь для всех файлов
    mode: 'development',
    entry: ['@babel/polyfill', './index.js'],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist') // папка для билда
    },
    resolve: {
        extensions: ['.js'],
        alias: { // для сокращения путей а-ля '../../../core/Component'
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 3000,
        hot: isDev
    },
    plugins: [
        new CleanWebpackPlugin(), // чистит папку дист при билде
        new HTMLWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        new CopyPlugin({ // для фавикона
            patterns: [
                {
                    from: path.resolve(__dirname, './src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
        new MiniCssExtractPlugin({ // отдельно собирает ксс, оптимизация
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: { // перезагрузка при изменении кода
                        hmr: isDev,
                        reloadAll: true
                    }
                },
                'css-loader',
                'sass-loader',
              ],
            },
            { // babel
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    }
};
