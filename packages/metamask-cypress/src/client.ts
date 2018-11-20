/// <reference types="Cypress" />

export const metamaskController = {
  setupPuppeteer(): void {
    cy.task("setupPuppeteer");
  },

  allowToConnect(): void {
    cy.task("metamaskAllowToConnect");
  },
};
