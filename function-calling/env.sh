#!/bin/bash

# Check if the .env file exists
if [ -f .env ]; then
    # Export the variables
    export $(egrep -v '^#' .env | xargs)
else
    echo ".env file not found"
    exit 1
fi
