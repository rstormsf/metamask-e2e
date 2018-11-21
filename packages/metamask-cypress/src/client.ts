/// <reference types="Cypress" />

import { MetamaskNetwork } from "metamask-puppeteer";
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

  loadPrivateKey(key: string): void {
    cy.task("loadPrivateKey", key);
  },

  changeNetwork(network: MetamaskNetwork): void {
    cy.task("changeNetwork", network);
  },

  acceptTx(): void {
    cy.task("acceptTx");
  },
};
