module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    semi: "warn",
    "no-underscore-dangle": 0,
    "func-names": "off",
    "no-unused-vars": "warn",
    "no-param-reassign": 0,
    "no-await-in-loop": 0,
    "no-console": "warn",
  },
};
