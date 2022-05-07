module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'plugin:prettier/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		// indent: [2, 'tab'],
		'no-console':
			process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger':
			process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		semi: ['error', 'always'],
		'vue/multi-word-component-names': ['off'],
		'vue/no-unused-components': [
			'error',
			{
				ignoreWhenBindingPresent: true,
			},
		],
		'import/order': [
			'error',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
				],
			},
		],
		'import/no-unresolved': ['error', { ignore: ['^@/'] }],
	},
};
