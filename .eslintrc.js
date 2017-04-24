module.exports = {
	'env': {
		'browser': true,
		'node': true,
		'es6': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaFeatures': {
			'experimentalObjectRestSpread': true,
			'jsx': true
		},
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'rules': {
		'no-console': 0,
		"react/jsx-uses-vars": [2],
		"react/jsx-uses-react": [2],
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	},
	'globals': {
		'AWS': true,
		'gapi': true
	}
};