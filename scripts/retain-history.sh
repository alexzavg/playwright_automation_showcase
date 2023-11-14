#!/bin/bash

# The directory name (stage or prod) is passed as an argument
DIR=$1

# Navigate to the directory within GITHUB_WORKSPACE
cd "$GITHUB_WORKSPACE/$DIR" || exit 1

# Retain the latest 3 reports
ls -t | tail -n +4 | xargs rm -rf --
