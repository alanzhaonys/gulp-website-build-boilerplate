#!/bin/bash

# prerequisites:
# 1. `npm install lambda-local -g`
# 2. create .env file from .env.sample

lambda-local -l index.js -e event.js --envfile .env 
