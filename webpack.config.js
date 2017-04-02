let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let inProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    devtool: 'source-map',
    entry: {
        wbs: [
            './src/js/app.js',
            './src/scss/app.scss'
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        // preLoaders: [
        //     {
        //         loader:'eslint',
        //         test:/\.js$/
        //     }
        // ],
        rules: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    use: ['css-loader?sourceMap!', 'sass-loader?sourceMap'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot)$/,
                loader: 'file-loader'
            },
            {
                test: /\.js$/,

                exclude: /node_modules/,

                loader: "babel-loader"
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        inline: true,
        stats: { colors: true }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            hash: true
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.LoaderOptionsPlugin({
            minimize : inProduction
        })
    ]
};

if(inProduction){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}