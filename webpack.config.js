const webpack = require('webpack')
const path = require('path')

module.exports = {
    target: 'electron-renderer',
    entry: './src/index.js',
    output: {
        filename: '[name]_[chunkhash:8].js',// 给输出的文件名称加上 hash 值
        path: path.resolve(__dirname, './dist/web')
    },
    reslove: {
        alias: {
            'vue$': 'vue/dist/veu.esm.js'
        }
    },
    module: {

    }
}
