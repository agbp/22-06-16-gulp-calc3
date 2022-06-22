module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'airbnb-base',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 13,
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
	],
	rules: {
		'linebreak-style': ['error', 'windows'],
		indent: [2, 'tab', { SwitchCase: 1 }],
		'no-tabs': 0,
		'no-console': ['error', { allow: ['warn', 'error'] }],
		'import/extensions': ['warn', { js: 'always' }],
	},
};
