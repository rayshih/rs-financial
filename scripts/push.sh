#!/bin/sh

echo 'git push'
git push

echo 'Copy data.js from ./src/ to iCloud ...'
cp ./src/data.js /Users/rayshih/Library/Mobile\ Documents/com~apple~CloudDocs/data.js

echo 'Done!'
