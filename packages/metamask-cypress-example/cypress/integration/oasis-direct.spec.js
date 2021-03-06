/// <reference types="Cypress" />
const { metamaskController } = require("metamask-cypress/dist/client");

describe("Oasis direct dummy", () => {
  let needsSetup;
  beforeEach(() => {
    cy.visit("https://oasis.direct");

    metamaskController.init();

    metamaskController.setupPuppeteer();
  });

  it("should accept metamask prompt", () => {
    cy.get("button").click();

    metamaskController.allowToConnect();

    cy.get(":nth-child(1) > .token > .token-name").contains("0 ETH");
  });
});
