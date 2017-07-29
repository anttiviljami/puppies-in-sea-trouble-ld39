#!/bin/bash

set -e

npm install --development

echo -e "\n------ Checking dependencies with David.. These are only warnings!\n"
david || true

echo -e "\n------ Linting code..\n"
npm run lint

