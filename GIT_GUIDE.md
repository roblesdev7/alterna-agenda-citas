# Git Collaboration Guide

## Initial Setup (Already Done)

```bash
# Clone the repository
git clone https://github.com/israelng334/alterna-agenda-citas.git
cd alterna-agenda-citas
```

## Daily Workflow

### 1. Before Starting Work

```bash
# Make sure you're on main branch
git checkout main

# Get latest changes from your partner
git pull origin main

# Create a new branch for your feature
git checkout -b frontend/feature-name
```

### 2. While Working

```bash
# See what files you've changed
git status

# Add files to commit
git add .

# Commit with a clear message
git commit -m "Add service selection component"

# Push to your branch
git push origin frontend/feature-name
```

### 3. Sharing Your Work

```bash
# Push your branch to GitHub
git push origin frontend/feature-name

# Then create a Pull Request on GitHub
# Your partner can review before merging
```

## Branch Naming Convention

Use prefixes to organize work:

```bash
frontend/service-selection    # Frontend features
frontend/booking-flow
frontend/fix-date-picker      # Fixes

backend/api-services          # Backend work (your partner)
backend/database-setup
```

## Common Commands

```bash
# See all branches
git branch -a

# Switch to a branch
git checkout branch-name

# Delete a branch (after merging)
git branch -d branch-name

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all local changes
git checkout -- .

# See commit history
git log --oneline

# See what changed in a file
git diff filename
```

## Avoiding Conflicts

### Work on Different Files
- You: `frontend/` folder
- Partner: `backend/` folder
- Minimal conflicts!

### Pulling Partner's Changes

```bash
# Before starting work
git checkout main
git pull origin main

# Update your feature branch
git checkout frontend/your-branch
git merge main
```

## Folder Structure for Collaboration

```
alterna-agenda-citas/
├── frontend/          # Your work
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/           # Partner's work
│   ├── src/
│   ├── controllers/
│   └── package.json
│
├── .gitignore         # Shared
└── README.md          # Shared
```

## .gitignore

Make sure these are in your `.gitignore`:

```gitignore
# Frontend
frontend/node_modules/
frontend/dist/
frontend/.env
frontend/.env.local

# Backend
backend/node_modules/
backend/.env
backend/dist/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

## Committing Best Practices

### Good Commit Messages ✅
```bash
git commit -m "Add service selection component with image cards"
git commit -m "Fix date picker not showing available slots"
git commit -m "Implement appointment cancellation flow"
git commit -m "Update API service to handle errors"
```

### Bad Commit Messages ❌
```bash
git commit -m "update"
git commit -m "fix"
git commit -m "changes"
git commit -m "asdf"
```

## Pull Request Template

When creating a PR, include:

```markdown
## What does this PR do?
Brief description of your changes

## Changes
- Added service selection component
- Implemented image cards for services
- Added price and duration display

## Testing
- Tested on Chrome, Firefox, Safari
- Tested mobile responsive design
- All services display correctly

## Screenshots
(Add screenshots if UI changes)

## Notes for Backend Partner
- Need endpoint: GET /api/services
- See API_DOCS.md for details
```

## Merge Strategy

### Option 1: Direct Merge (Simple)
```bash
# Your partner reviews and merges on GitHub
# Then you pull the changes
git checkout main
git pull origin main
```

### Option 2: Rebase (Clean History)
```bash
# Before merging, update your branch
git checkout frontend/your-branch
git rebase main
git push -f origin frontend/your-branch
```

## Handling Conflicts

If you get a merge conflict:

```bash
# 1. Pull latest changes
git pull origin main

# 2. Git will mark conflicts in files
# Open the file and look for:
<<<<<<< HEAD
Your changes
=======
Partner's changes
>>>>>>> main

# 3. Edit file to keep what you want
# Remove the markers (<<<, ===, >>>)

# 4. Add and commit
git add .
git commit -m "Resolve merge conflict in..."
git push
```

## Emergency Commands

### Oops, committed to wrong branch
```bash
git log  # Copy the commit hash
git checkout correct-branch
git cherry-pick <commit-hash>
git checkout wrong-branch
git reset --hard HEAD~1
```

### Oops, need to undo everything
```bash
# Discard all changes (careful!)
git reset --hard HEAD
git clean -fd
```

### Accidentally deleted work
```bash
# Find the commit
git reflog

# Restore to that commit
git checkout <commit-hash>
```

## Working Together

### Daily Standup (Quick Check-in)
- What did you work on?
- What will you work on today?
- Any blockers with backend integration?

### Integration Points
- Share API endpoint changes immediately
- Test locally before pushing
- Communicate breaking changes
- Keep API_DOCS.md updated

## Deployment Workflow

```bash
# 1. Merge to main
git checkout main
git pull origin main

# 2. Tag release
git tag -a v1.0.0 -m "First release"
git push origin v1.0.0

# 3. Deploy
# (Use GitHub Actions, Vercel, or manual)
npm run build
# Deploy dist/ folder
```

## Useful Git Aliases

Add to `~/.gitconfig`:

```ini
[alias]
  st = status
  co = checkout
  br = branch
  ci = commit
  unstage = reset HEAD --
  last = log -1 HEAD
  visual = log --oneline --graph --all
```

Then use:
```bash
git st      # instead of git status
git co main # instead of git checkout main
```

## Tips

1. **Commit Often**: Small commits are better than big ones
2. **Pull Frequently**: Stay up to date with partner's work
3. **Clear Messages**: Future you will thank you
4. **Test Before Push**: Don't break main branch
5. **Use Branches**: Never commit directly to main
6. **Communicate**: Tell your partner about big changes

## Need Help?

```bash
# Git cheatsheet
git help

# Specific command help
git help commit
git help merge
```

---

Happy collaborating! 🚀
