'use strict';

var path = require('path'),
	webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		'bundle': './styles/main.scss'
	},
	output: {
		path: './build/',
		filename: '[name].js'
	},
	devtool: 'cheap-module-eval-source-map',
	watch: true,
	keepalive: true,
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?sourceMap'),
				exclude: /node_modules/
			},
			{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=200000' },
			{
				test   : /vendor\/.+\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
			    loader : 'file-loader',
			    exclude: /node_modules/
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('styles.css')
	],
	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js', '.es6', '.jsx']
	},
};
