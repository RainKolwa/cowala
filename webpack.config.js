var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var autoprefixer = require('autoprefixer');

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name:      'main', // Move dependencies to our main file
        children:  true, // Look for common dependencies in all children,
        minChunks: 2, // How many times a dependency must come up before being extracted
    }),
    new webpack.ProvidePlugin({
	    $: "jquery",
	    jQuery: "jquery",
	    "window.jQuery": "jquery"
	})
];

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry:  './src/index.js',
    output: {
	    path:          'builds',
	    filename:      'bundle.js',
	    chunkFilename: '[name]-[chunkhash].js',
	    publicPath:    'builds/',
	},
    plugins: plugins,
    module: {
        resolve: {
            extensions: ['', '.js', '.scss', '.html']
        },
        loaders: [
            {
			    test:    /\.js/,
			    loader:  'babel',
			    include: __dirname + '/src',
			},
			{
			    test: /\.scss$/,
			    loader: 'style!css!postcss-loader!sass',
			},
			{
			    test:   /\.html/,
			    loader: 'html',
			},
			{
			    test:   /\.(png|gif|jpe?g|svg)$/i,
			    loader: 'url?limit=10000',
			},
        ],
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions','ie >= 9'] }) ]
};