#!/bin/sh

echo 'git pull'
git pull

echo 'Copy data.js from iCloud to ./src/ ...'
cp /Users/rayshih/Library/Mobile\ Documents/com~apple~CloudDocs/data.js ./src/data.js

echo 'Done!'
