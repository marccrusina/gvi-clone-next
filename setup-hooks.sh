#!/bin/bash

# Setup script for Husky Git hooks
# This ensures all developers have the proper Git hooks installed

set -e

echo "🐶 Setting up Husky Git hooks..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "❌ Not in a git repository. Please run this script from the project root."
  exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
  echo "❌ package.json not found. Please run this script from the project root."
  exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Initialize Husky if not already done
if [ ! -d ".husky" ]; then
  echo "🔧 Initializing Husky..."
  npx husky init
fi

# Ensure all hooks are executable
echo "🔐 Making hooks executable..."
chmod +x .husky/*

# Verify Git hooks path is set correctly
echo "🔍 Verifying Git hooks configuration..."
if ! git config core.hooksPath | grep -q ".husky"; then
  echo "⚠️  Git hooks path not set correctly. Setting it now..."
  git config core.hooksPath .husky
fi

echo "✅ Husky setup complete!"
echo ""
echo "📋 Available hooks:"
echo "  - pre-commit: Runs lint-staged on staged files"
echo "  - pre-push: Runs Biome check, TypeScript check, and tests"
echo ""
echo "🧪 To test the hooks:"
echo "  - Make a change and commit: git commit -m 'test'"
echo "  - Try to push: git push"
echo ""
echo "💡 Note: The pre-commit hook will automatically ensure all hooks are installed"
echo "   for other developers when they commit for the first time."
