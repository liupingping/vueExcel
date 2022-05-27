module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-lonely-if': 'off',
    'no-underscore-dangle': 'off',
    'max-len': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'no-unused-expressions': 'off',
    'import/extensions': 'off',
    'camelcase': 'off',
  },
};
