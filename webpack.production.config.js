var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var production = process.env.NODE_ENV === 'production';
var autoprefixer = require('autoprefixer');

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name:      'main', // Move dependencies to our main file
        children:  true, // Look for common dependencies in all children,
        minChunks: 2, // How many times a dependency must come up before being extracted
    })
];

plugins = plugins.concat([

	// Cleanup the builds/ folder before
    // compiling our final assets
    new CleanPlugin('builds'),

    // This plugin looks for similar chunks and files
    // and merges them for better caching by the user
    new webpack.optimize.DedupePlugin(),

    // This plugins optimizes chunks and modules by
    // how much they are used in your app
    new webpack.optimize.OccurenceOrderPlugin(),

    // This plugin prevents Webpack from creating chunks
    // that would be too small to be worth loading separately
    new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 51200, // ~50kb
    }),

    // This plugin minifies all the Javascript code of the final bundle
    new webpack.optimize.UglifyJsPlugin({
        mangle:   true,
        compress: {
            warnings: false, // Suppress uglification warnings
        },
    }),

    // This plugins defines various variables that we can set to false
    // in production to avoid code related to them from being compiled
    // in our final bundle
    new webpack.DefinePlugin({
        __SERVER__:      !production,
        __DEVELOPMENT__: !production,
        __DEVTOOLS__:    !production,
        'process.env':   {
            BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
        },
    }),

]);


module.exports = {
    entry:  './src/index.js',
    output: {
	    path:          'builds',
	    filename:      '[name]-[hash].js',
	    chunkFilename: '[name]-[chunkhash].js',
	    publicPath:    'builds/',
	},
    plugins: plugins,
    module: {
        resolve: {
            extensions: ['', '.js', '.scss']
        },
        loaders: [
            {
                test : "plugins/jquery/**/*.js$",  
                loader : "imports?jQuery=jquery,$=jquery,this=>window"  
            },
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
			    test:   /\.(png|gif|jpe?g|svg|json)$/i,
			    loader: 'url?limit=10000',
			},
        ],
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions','ie >= 9'] }) ]
};