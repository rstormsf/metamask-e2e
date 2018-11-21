#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

# to update go to https://github.com/MetaMask/metamask-extension/releases and hardcode different URL
METAMASK_URL="https://github.com/MetaMask/metamask-extension/releases/download/v5.0.2/metamask-chrome-5.0.2.zip"

OUT_DIR="../metamask-bundle"

if [ ! -d $OUT_DIR ]; then
    mkdir -p $OUT_DIR
    wget -qO- $METAMASK_URL | bsdtar -xvf- -C $OUT_DIR
    # @TODO:  we should verify download file's SHA here
fi
