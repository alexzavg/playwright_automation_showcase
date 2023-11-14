#!/bin/bash

# The directory (stage or prod) is passed as an argument
DIR=$1

# Navigate to the directory
echo "Navigating to the $DIR directory..."
cd "$DIR" || exit

# Retain the latest 3 reports
echo "Retaining the latest 3 reports..."
ls -t | tail -n +4 | xargs rm -rf --

# Go back to the root directory
echo "Returning to the root directory..."
cd ..
