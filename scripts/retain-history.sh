#!/bin/bash

# The directory (stage or prod) is passed as an argument
DIR=$1

# Absolute path to the directory
DIR_PATH="$GITHUB_WORKSPACE/$DIR"

# Check if the directory exists
if [ ! -d "$DIR_PATH" ]; then
    echo "Directory $DIR_PATH does not exist."
    exit 1
fi

# Navigate to the directory
cd $DIR_PATH || exit

# Retain the latest 3 reports
ls -t | tail -n +4 | xargs rm -rf --

# Go back to the root directory
cd $GITHUB_WORKSPACE || exit
