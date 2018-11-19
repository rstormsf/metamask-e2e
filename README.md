# Metamask-E2E

[![CircleCI](https://circleci.com/gh/OasisDEX/metamask-e2e.svg?style=svg)](https://circleci.com/gh/OasisDEX/metamask-e2e)

Set of packages allowing you to control [Metamask](https://github.com/MetaMask/metamask-extension) during E2E tests.

### Packages

| Package                                              | Version | Description                                                                    |
| ---------------------------------------------------- | ------- | ------------------------------------------------------------------------------ |
| [`metamask-puppeteer`](/packages/metamask-puppeteer) | -       | Control metamask using [Puppeteer](https://github.com/GoogleChrome/puppeteer). |
| [`metamask-cypress`](/packages/metamask-cypress)     | -       | Control metamask using [Cypress](https://www.cypress.io/).                     |

### Examples

- [`metamask-puppeteer`](/packages/metamask-puppeteer-example)
- [`metamask-cypress`](/packages/metamask-cypress-example)

## Continuous Integration Gotchas

First of all, headless chrome
[doesn't support loading extensions](https://github.com/GoogleChrome/puppeteer/issues/659). This leaves us with running
`headed` Chrome with something like `xvfb`.

To run it with `cypress` you need to pass additional arguments: `cypress run --browser chrome --headed` and make sure
that you're running resonable new Google Chrome version (we needed to update it on CircleCI).

[See our CircleCI config](.circleci/config.yml)
