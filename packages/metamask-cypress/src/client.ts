/// <reference types="Cypress" />

import { MetamaskCypressTasksHandler } from ".";

export const metamaskController: MetamaskCypressTasksHandler = {
  init(): void {
    cy.task("init");
  },

  isSetupNeeded(): Cypress.Chainable<boolean> {
    return cy.task("isSetupNeeded") as any;
  },

  setupPuppeteer(): void {
    cy.task("setupPuppeteer");
  },

  allowToConnect(): void {
    cy.task("allowToConnect");
  },
};
