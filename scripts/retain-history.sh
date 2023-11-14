#!/bin/bash

# The directory (stage or prod) is passed as an argument
DIR=$1

# Navigate to the directory
cd ..
cd $DIR

# Retain the latest 3 reports
ls -t | tail -n +4 | xargs rm -rf --

# Go back to the root directory
cd ..
