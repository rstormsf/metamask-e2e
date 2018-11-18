# Metamask-E2E

Set of packages allowing you to control [Metamask](https://github.com/MetaMask/metamask-extension) during E2E tests.

### Packages

| Package                                              | Version | Description                                                                    |
| ---------------------------------------------------- | ------- | ------------------------------------------------------------------------------ |
| [`metamask-puppeteer`](/packages/metamask-puppeteer) | -       | Control metamask using [puppeteer](https://github.com/GoogleChrome/puppeteer). |
| [`metamask-cypress`](/packages/metamask-cypress)     | -       | Control metamask using [cypress](https://www.cypress.io/).                     |

### Examples

- [`metamask-puppeteer`](/packages/metamask-puppeteer-example)
- [`metamask-cypress`](/packages/metamask-cypress-example)

## Headless Chrome note

Loading extensions is [NOT supported](https://github.com/GoogleChrome/puppeteer/issues/659) in headless chrome. You need
to run something like `xvfb` during your e2e test and headed chrome.
[See how we do this during our CI](.circleci/config.yml).
