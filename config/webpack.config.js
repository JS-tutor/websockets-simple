require('dotenv').config()
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const webpack = require('webpack')
const {join, resolve} = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const srcPath = resolve('src')
const contentBase = resolve('public')
const destPath = join(contentBase, 'dest')

console.log('PRODUCTION MODE: %s', IS_PRODUCTION)
console.log({srcPath, contentBase, destPath})

// const extractLess = new ExtractTextPlugin({
//     filename: '[name]11.css',
//     //disable: IS_PRODUCTION
// })

const config = {
    mode: IS_PRODUCTION ? 'production' : 'development',
    context: srcPath,
    entry: {
        client: resolve(srcPath, 'client/client.js'),
        style: resolve(srcPath, 'styles/main.less'),
        // будет сгенерирован style.bundle.js, можно после сборки его удалить
    },
    output: {
        path: destPath,
        filename: '[name].bundle.js',
        publicPath: '/dest',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: resolve(srcPath, 'client'),
                exclude: /node_modules/,
                //loader: 'babel',
            },
            {
                test: /\.(css|less)$/,
                use: ExtractTextPlugin.extract({
                    use: [{loader: 'css-loader'}, {loader: 'less-loader'}],
                    fallback: 'style-loader'
                })
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // extractLess,
        new ExtractTextPlugin('bundle.min.css'),
    ],
    devServer: {
        contentBase,
        hot: true,
        port: 8000,
    }
}

module.exports = config