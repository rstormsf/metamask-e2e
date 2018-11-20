const { metamaskCypressPlugin } = require("metamask-cypress");

module.exports = (on, config) => {
  metamaskCypressPlugin(on, config);
};
