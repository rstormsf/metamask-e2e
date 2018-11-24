/// <reference types="Cypress" />

import { MetamaskNetwork } from "metamask-puppeteer";
import { MetamaskCypressTasksHandler } from ".";
import { MetamaskStatus } from "metamask-puppeteer/dist/PuppeteerMetamask";

export const metamaskController: MetamaskCypressTasksHandler = {
  init(): void {
    cy.task("init");
  },

  unlockAccount(password?: string): void {
    cy.task("unlockAccount", password);
  },

  getStatus(): Cypress.Chainable<MetamaskStatus> {
    return cy.task("getStatus") as any;
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
