const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  plugins: ["react-hooks", "@typescript-eslint", "prettier", "import"],
  rules: {
    camelcase: ERROR,
    "no-use-before-define": OFF,
    "@typescript-eslint/no-unused-vars": [ERROR],
    "import/prefer-default-export": OFF,
    "import/no-extraneous-dependencies": [
      ERROR,
      {
        devDependencies: [
          "**/stories.tsx",
          "**/*.stories.tsx",
          "**/test.ts*",
          "**/*.test.ts*",
        ],
      },
    ],
    "import/extensions": [
      "error",
      {
        jsx: "never",
        tsx: "never",
      },
    ],
    "react/jsx-props-no-spreading": OFF,
    "react/prop-types": OFF,
    "react/require-default-props": OFF,
    "react/jsx-fragments": [ERROR, "element"],
    "react-hooks/rules-of-hooks": ERROR,
    "prettier/prettier": ERROR,
    "react/jsx-filename-extension": [OFF, { extensions: [".tsx"] }],
    "@typescript-eslint/explicit-module-boundary-types": OFF,
    "@typescript-eslint/explicit-member-accessibility": OFF,
    "@typescript-eslint/explicit-function-return-type": OFF,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx"],
      },
      typescript: {},
    },
  },
}
