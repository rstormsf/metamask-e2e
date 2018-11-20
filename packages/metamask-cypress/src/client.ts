/// <reference types="Cypress" />

import { MetamaskCypressTasksHandler } from ".";

export const metamaskController: MetamaskCypressTasksHandler = {
  setupPuppeteer(): void {
    cy.task("setupPuppeteer");
  },

  allowToConnect(): void {
    cy.task("metamaskAllowToConnect");
  },
};
