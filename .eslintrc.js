module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/destructuring-assignment': 'off',
    'no-unreachable': 'off',
    camelcase: 0,
  },
};
