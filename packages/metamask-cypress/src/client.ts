/// <reference types="Cypress" />

import { MetamaskCypressTasksHandler } from ".";

export const metamaskController: MetamaskCypressTasksHandler = {
  needsSetup(): Cypress.Chainable<boolean> {
    return cy.task("needsSetup") as any;
  },

  setupPuppeteer(): void {
    cy.task("setupPuppeteer");
  },

  allowToConnect(): void {
    cy.task("allowToConnect");
  },
};
