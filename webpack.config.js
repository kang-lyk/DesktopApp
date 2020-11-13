const webpack = require('webpack')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isdevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    target: 'electron-renderer',
    entry: './src/main.js',
    output: {
        filename: '[name]_[chunkhash:8].js',// 给输出的文件名称加上 hash 值
        path: path.resolve(__dirname, './dist/web'),
        publicPath: '/'
    },
    reslove: {
        alias: {
            '@': '/src',
            'vue$': 'vue/dist/veu.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    isdevelopment ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.scss/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            indentedSyntax: true,
                            sassOptions: {
                                indentedSyntax: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },
            // {
            //     test: /\.ts$/,
            //     loader: 'ts-loader',
            //     options: { appendTsSuffixTo: [/\.vue$/] }
            // },
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|webp|)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new StyleLintPlugin({
            files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}']
        }),
        CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public'),
                    to: path.resolve(__dirname, 'dist/web/')
                }
            ]
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '桌面应用'
        })
    ]
}
