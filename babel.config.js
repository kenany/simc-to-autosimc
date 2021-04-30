module.exports = {
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    ["@emotion/babel-plugin", {
      "cssPropOptimization": false
    }]
  ]
};
