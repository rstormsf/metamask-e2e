#!/usr/bin/env node
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const manifestKeyPath = join(__dirname, "./manifest-key.txt");
const manifestKey = readFileSync(manifestKeyPath, "utf8");

const manifestPath = join(__dirname, "../metamask-bundle/manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

manifest.key = manifestKey;

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
