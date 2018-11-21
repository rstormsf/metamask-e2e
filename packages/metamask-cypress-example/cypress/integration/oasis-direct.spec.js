/// <reference types="Cypress" />
const { metamaskController } = require("metamask-cypress/dist/client");

context("Oasis direct dummy", () => {
  let needsSetup;
  beforeEach(() => {
    cy.visit("https://oasis.direct");

    metamaskController.init();

    metamaskController.isSetupNeeded().then(ns => {
      needsSetup = ns;
      if (needsSetup) {
        metamaskController.setupPuppeteer();
      }
    });
  });

  it("should accept metamask prompt", () => {
    cy.get("button").click();

    if (needsSetup) {
      metamaskController.allowToConnect();
    }

    cy.get(":nth-child(1) > .token > .token-name").contains("0 ETH");
  });
});
