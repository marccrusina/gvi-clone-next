# Git Hooks Setup

This project uses Husky to manage Git hooks that ensure code quality and consistency across all developers.

## Quick Setup

Run the setup script to configure Git hooks:

```bash
npm run setup-hooks
```

Or manually:

```bash
./setup-hooks.sh
```

## What the Hooks Do

### Pre-commit Hook
- **Ensures Husky hooks are installed** for all developers
- **Runs lint-staged** on staged files to:
  - Format code with Biome
  - Check for linting issues
  - Auto-fix issues where possible

### Pre-push Hook
- **Runs comprehensive checks** before allowing push:
  - Biome code quality check
  - TypeScript type checking
  - Test suite execution
- **Installs dependencies** if `node_modules` is missing
- **Provides clear feedback** on what failed and needs fixing

## For New Developers

When a new developer clones the repository:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup Git hooks:**
   ```bash
   npm run setup-hooks
   ```

3. **The hooks will be automatically maintained** - the pre-commit hook ensures all required hooks exist for future commits.

## Manual Hook Management

If you need to manually manage hooks:

```bash
# Initialize Husky
npx husky init

# Install hooks
npx husky

# Make hooks executable
chmod +x .husky/*
```

## Troubleshooting

### Hooks Not Running
- Ensure you're in a Git repository
- Check that `.husky` directory exists
- Verify hooks are executable: `ls -la .husky/`
- Check Git hooks path: `git config core.hooksPath`

### Permission Issues
```bash
chmod +x .husky/*
chmod +x setup-hooks.sh
```

### Skip Hooks (Emergency Only)
```bash
# Skip pre-commit
git commit -m "message" --no-verify

# Skip pre-push
git push --no-verify

# Disable all hooks temporarily
HUSKY=0 git push
```

## Hook Configuration

The hooks are configured in:
- `.husky/pre-commit` - Pre-commit hook script
- `.husky/pre-push` - Pre-push hook script
- `package.json` - lint-staged configuration
- `setup-hooks.sh` - Setup script for new developers
