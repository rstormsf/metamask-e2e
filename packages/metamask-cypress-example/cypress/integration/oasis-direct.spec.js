/// <reference types="Cypress" />
const { metamaskController } = require("metamask-cypress/dist/client");

context("Oasis direct dummy", () => {
  beforeEach(() => {
    cy.visit("https://oasis.direct");
  });

  it("should accept metamask prompt", () => {
    metamaskController.setupPuppeteer();

    cy.get("button").click();

    metamaskController.allowToConnect();
  });
});
