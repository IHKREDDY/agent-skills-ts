---
name: auto-commit
description: Generates semantic commit messages from staged changes. Analyzes git diff and creates conventional commit messages. Use when users want to commit with good messages, mention "commit", "save changes", or ask for commit message suggestions.
license: MIT
metadata:
  author: IHKREDDY
  version: "1.0"
  category: productivity
compatibility: Requires Git
---

# Auto-Commit Skill

## 🎯 Use Case Demo

### Scenario
*Developer Sarah just finished implementing a new seat selection feature. She has 5 files changed but struggles to write a good commit message.*

**Before (Manual):**
```bash
git commit -m "updated stuff"  # 😬 Bad commit message
```

**After (With Skill):**
```bash
# Skill analyzes the diff and suggests:
feat(booking): add passenger seat selection with availability check

- Add SeatSelection model with row and seat properties
- Implement seat availability validation in BookingService
- Add GET /api/seats/{flightId} endpoint
- Update booking flow to include seat assignment
```

### Time Saved: 5-10 minutes per commit × 20 commits/day = 2+ hours/day

---

## When to Use This Skill

- After making changes, before committing
- When unsure how to describe changes
- To maintain consistent commit message format
- For generating detailed commit bodies

## Commit Message Format

Following [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code restructuring
- `test` - Adding tests
- `chore` - Maintenance

## Agent Instructions

When user asks to commit or wants a commit message:

1. **Get staged changes**: `git diff --cached`
2. **Analyze the diff** to understand:
   - What files changed
   - What type of change (feature, fix, refactor)
   - The scope (which module/component)
3. **Generate commit message** following conventional commits
4. **Present to user** for approval
5. **Execute commit** if approved

### Example Prompts

User: "Commit my changes"
→ Analyze diff, suggest message, commit

User: "What should my commit message be?"
→ Analyze diff, suggest message only

User: "Commit with message: fix login bug"
→ Use provided message directly

## Demo Script

```bash
# 1. Make some changes
echo "// New feature" >> src/feature.ts

# 2. Stage changes
git add .

# 3. Ask agent: "Generate a commit message for my changes"

# 4. Agent analyzes and suggests:
#    feat(core): add new feature module
#    
#    - Add feature.ts with core functionality
#    - Implement base feature logic

# 5. User approves, agent commits
```

## Benefits

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Commit message quality | Inconsistent | Standardized | ✅ 100% |
| Time per commit | 2-5 min | 10 sec | ⬇️ 90% |
| Changelog generation | Manual | Automated | ✅ Enabled |
| Code review context | Poor | Excellent | ⬆️ 10x |
