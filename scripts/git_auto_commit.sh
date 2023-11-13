#!/bin/bash

# Add all changes to git
git add .

# Commit the changes with a message
# Replace 'Auto commit' with your desired commit message
git commit -m "Auto commit"

# Force push to the remote repository
# Replace 'main' with your branch name if different
git push origin main --force
 