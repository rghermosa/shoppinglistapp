#!/bin/bash

for d in ./src/Contexts/*/ ; do (cd "$d" && npm install); done
