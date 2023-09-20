module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2015,
    createDefaultProgram: true,
  },
  rules: {
    'no-unused-vars': 'warn',
  },
};
