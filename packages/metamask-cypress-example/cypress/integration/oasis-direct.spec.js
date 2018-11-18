/// <reference types="Cypress" />

context("Oasis direct dummy", () => {
  beforeEach(() => {
    cy.visit("https://oasis.direct");
  });

  it("cy.title() - get the title", () => {
    cy.task("setupPuppeteer");

    cy.get("button").click();

    cy.task("metamaskAccept");
  });
});
