/// <reference types="Cypress" />

context("Oasis direct dummy", () => {
  beforeEach(() => {
    cy.visit("https://oasis.direct");
  });

  it("should accept metamask prompt", () => {
    cy.task("setupPuppeteer");

    cy.get("button").click();

    cy.task("metamaskAccept");
  });
});
