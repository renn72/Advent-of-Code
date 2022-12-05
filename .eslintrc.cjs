module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/ban-ts-comment' : 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars' : 'off',
    'prefer-const' : 'off',
    'no-empty' : 'off',
  }
};
