/* eslint-disable import/no-extraneous-dependencies */
const { injectBabelPlugin } = require("react-app-rewired");

module.exports = function override(config) {
  return injectBabelPlugin("styled-jsx/babel", config);
};
