const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//Webpack creates bundled files (combines modules in ES6, converst SASS to css, etc); outputs .css, .js, + img's

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    //HTML plugin copies index.html from src/ and outputs in dist/ folder with the output js bundle as src -- before build can even serve indexhtml without outputting in dist/
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    //below is needed to use babel. Checks if js file and adds babel loader
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}