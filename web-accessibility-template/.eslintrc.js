module.exports = {
  ignorePatterns: [
    'webpack.config.js',
    '.eslintrc.js',
    'dist',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: ['@html-eslint', 'css-modules'],
  extends: ['eslint:recommended'],
  rules: {
  'no-unused-vars': 'warn',
  'no-undef': 'error',
  'semi': ['error', 'always'],
  'no-mixed-spaces-and-tabs': 'error',
  },
  overrides: [
    {
      files: ["*.html"],
      parser: "@html-eslint/parser",
      rules: {
        "@html-eslint/no-abstract-roles": "error",
        "@html-eslint/no-accesskey-attrs": "error",
        "@html-eslint/no-aria-hidden-body": "error",
        "@html-eslint/no-positive-tabindex": "error",
        "@html-eslint/no-skip-heading-levels": "error",
        "@html-eslint/require-frame-title": "error",
        "@html-eslint/require-img-alt": "warn",
        "@html-eslint/require-meta-viewport": "error",
      },
    },
  ],
};
