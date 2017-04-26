'use strict';

const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
	entry: ['babel-polyfill', './app/index.js'],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: 'dist'
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					fix: true
				}
			},
			{
				test: /\.jsx?$/,
				include: [path.resolve(__dirname, 'app')],
				loader: 'babel-loader',
				options: {
					presets: ['es2015', 'react'],
					plugins: [
						'transform-class-properties',
						'transform-object-rest-spread'
					]
				}
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { importLoaders: 1 }
					},
					'less-loader'
				]
			},
			//For vendor styles e.g. bootstrap/fontawesome etc
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { importLoaders: 1 }
					}
				]
			},
			{
				test: /\.(woff2?|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
				loader: 'url-loader?limit=100000'
			}
		]
	},
	plugins: [new BundleAnalyzerPlugin({ analyzerMode: 'disabled' })]
};
