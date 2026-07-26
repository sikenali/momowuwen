#!/bin/bash
set -e

BID_DIR="/home/jingle/opc/bid-assistant"
TARGET_DIR="/home/jingle/opc/momowuwen/public/boomerang"

echo "Building boomerang-doc..."
npm --prefix "$BID_DIR" run build

echo "Syncing to momowuwen..."
rm -rf "$TARGET_DIR"/*
cp -r "$BID_DIR/dist/"* "$TARGET_DIR/"

echo "Done!"
