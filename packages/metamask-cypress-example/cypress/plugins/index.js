const { metamaskCypress } = require("metamask-cypress");

module.exports = (on, config) => {
  metamaskCypress(on, config);
};
