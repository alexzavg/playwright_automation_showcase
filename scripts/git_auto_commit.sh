#!/bin/bash

# Navigate to your project directory
#cd ..

# Add all changes to git
git add .

# Commit the changes with a message
# Replace 'Your commit message' with your desired commit message
git commit -m "Auto commit"

# Force push to the remote repository
# Replace 'master' with your branch name if different
git push origin main --force
