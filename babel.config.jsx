module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-flow"],
  targets: {
    node: "current",
  },
  plugins: ["@babel/plugin-syntax-jsx", "@babel/plugin-transform-react-jsx"],
};
