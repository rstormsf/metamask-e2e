# Metamask Puppeteer

Uses Puppeteer to control Metamask instance running in chrome.

## Bundling new Metamask

`metamask-bundle` (gitignored) contains bundled metamask version. There are bunch of scripts to automate working with
this bundle:

- ./scripts/get-metamask.sh — downloads metamask version (hardcoded in script)
- ./scripts/fix-metamask-manifest.js — modifies manifest of bundled metamask to pin it to specified extension id. Key is
  defined in `./scripts/manifest-key.txt` This probably should not require any changes in the future.
