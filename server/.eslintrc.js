module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'func-names': 'off',
    'consistent-return': 'off',
    'no-console': 'off',
    'global-require': 'off',
  },
  env: {
    jest: true,
  },
};
