---
name: branch-and-pr
description: Creates git branches from Jira tickets and opens Pull Requests to the main branch. Use when users want to create a branch for a Jira task, open a PR, or mention "create branch", "open PR", "pull request", or "merge to main".
license: MIT
metadata:
  author: IHKREDDY
  version: "1.0"
  category: development
compatibility: Requires Node.js 18+, GitHub CLI (gh), and Atlassian MCP
---

# Branch and PR Skill

## When to Use This Skill

Use this skill when:
- Creating a git branch from a Jira ticket
- Opening a Pull Request to main/master branch
- Users mention "create branch for FB-1", "open PR", "submit for review"
- Automating the full workflow: branch → code → PR

## Prerequisites

### 1. GitHub CLI

```bash
brew install gh
gh auth login
```

### 2. Atlassian MCP Server

Ensure `.vscode/mcp.json` is configured with Atlassian MCP.

## Workflow Commands

### Create Branch from Jira Ticket

```bash
# Creates a properly named branch from Jira ticket
node --loader ts-node/esm .github/skills/skills/branch-and-pr/scripts/create-branch.ts --ticket FB-1
```

**What it does:**
1. ✅ Fetches ticket details from Jira
2. ✅ Creates branch with naming convention: `feature/{ticket-key}-{short-description}`
3. ✅ Pushes branch to origin
4. ✅ Transitions ticket to "In Progress" (optional)

### Create Pull Request

```bash
# Creates a draft PR from current branch to main
node --loader ts-node/esm .github/skills/skills/branch-and-pr/scripts/create-pr.ts --ticket FB-1
```

**What it does:**
1. ✅ Gets ticket summary from Jira
2. ✅ Creates PR with title: `[FB-1] Ticket summary`
3. ✅ Adds Jira link and description to PR body
4. ✅ Opens as draft PR for review

### Full Workflow (Branch + PR)

```bash
# Creates branch, then PR when ready
node --loader ts-node/esm .github/skills/skills/branch-and-pr/scripts/full-workflow.ts --ticket FB-1
```

## Branch Naming Conventions

| Issue Type | Branch Prefix | Example |
|------------|---------------|---------|
| Task/Story | `feature/` | `feature/fb-1-add-meal-selection` |
| Bug | `bugfix/` | `bugfix/fb-2-fix-booking-error` |
| Hotfix | `hotfix/` | `hotfix/fb-3-critical-payment-fix` |

## PR Template

The generated PR includes:
- Link to Jira ticket
- Description from ticket
- Checklist for review
- Auto-draft status

## Agent Instructions

When the user asks to create a branch or PR:

1. **Extract ticket ID** from the request (e.g., "FB-1", "SAM1-123")
2. **Fetch ticket details** using Atlassian MCP: `mcp_atlassian_atl_getJiraIssue`
3. **Create branch** with proper naming convention
4. **Push to origin** to make it available
5. **Create PR** when user is ready for review

### Example Prompts

User: "Create a branch for FB-1"
→ Run `create-branch.ts --ticket FB-1`

User: "Open a PR for this ticket to main"
→ Run `create-pr.ts --ticket FB-1`

User: "I'm done with FB-1, create a PR"
→ Commit changes, then run `create-pr.ts --ticket FB-1`

## Script Options

### create-branch.ts

| Option | Description | Default |
|--------|-------------|---------|
| `--ticket` | Jira ticket key (required) | - |
| `--no-push` | Create branch without pushing | false |
| `--no-transition` | Don't update Jira status | false |

### create-pr.ts

| Option | Description | Default |
|--------|-------------|---------|
| `--ticket` | Jira ticket key (required) | - |
| `--base` | Target branch | main |
| `--draft` | Create as draft PR | true |
| `--no-draft` | Create as ready for review | false |

## Error Handling

- If branch already exists: Switch to existing branch
- If PR already exists: Show existing PR URL
- If GitHub CLI not installed: Show installation instructions
- If ticket not found: Show error with suggestions
