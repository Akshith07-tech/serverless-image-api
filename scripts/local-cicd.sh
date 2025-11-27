#!/bin/bash
echo "=== Local CI/CD Started ==="

# Step 1: Install dependencies
echo "Installing dependencies..."
npm install

# Step 2: Run tests
echo "Running tests..."
node ./local/test-upload.js

# Step 3: Create build artifact
echo "Creating build artifact..."
mkdir -p build
zip -r build/build.zip ./local ./convert.js ./get-presigned-url.js ./package.json ./package-lock.json

echo "Build artifact created at build/build.zip ✅"
echo "=== CI/CD Completed Successfully ==="

