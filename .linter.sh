#!/bin/bash
cd /home/kavia/workspace/code-generation/piggyhabit-27064-9ee0a101/piggyhabit
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

