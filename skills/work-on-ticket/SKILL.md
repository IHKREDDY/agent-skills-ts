---
name: work-on-ticket
description: Pulls ticket details from Jira, creates feature branches with proper naming conventions, and handles planning steps. Use when starting work on a Jira ticket, creating branches for tickets, or when users mention "work on ticket", "start ticket", "create branch for", or Jira ticket IDs.
license: MIT
metadata:
  author: IHKREDDY
  version: "1.0"
  category: development
compatibility: Requires Node.js 18+ and npm
---

# Work on Ticket Skill

## When to Use This Skill

Use this skill when:
- Starting work on a Jira ticket
- Creating a feature branch for a ticket
- Fetching ticket details and acceptance criteria
- Setting up workspace for new development work
- Users mention ticket IDs like "SAM1-123" or "work on ticket"

## Prerequisites

### 1. Install Dependencies

```bash
cd .github/skills && npm install
```

### 2. Configure Jira Credentials

Create a `.env` file in your project root:

```env
JIRA_URL=https://ihkreddy.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=your-api-token
JIRA_DEFAULT_PROJECT=SAM1
```

## Workflow Process

### 1. Fetch Ticket Details

```bash
npx ts-node --esm .github/skills/skills/work-on-ticket/scripts/fetch-ticket.ts --ticket SAM1-123
```

This retrieves:
- Ticket summary and description
- Status and priority
- Assignee and reporter
- Acceptance criteria
- Labels

### 2. Start Working on a Ticket

```bash
npx ts-node --esm .github/skills/skills/work-on-ticket/scripts/start-work.ts --ticket SAM1-123
```

This will:
1. ✅ Fetch ticket details
2. ✅ Display summary and acceptance criteria
3. ✅ Create feature branch with proper naming
4. ✅ Transition ticket to "In Progress"
5. ✅ Add comment: "Started working on this ticket"

### 3. Branch Naming Conventions

- Feature: `feature/sam1-123-short-description`
- Bug fix: `bugfix/sam1-123-short-description`
- Hotfix: `hotfix/sam1-123-short-description`

## Script Reference

### fetch-ticket.ts

Retrieves complete ticket information from Jira.

```bash
# Basic fetch
npx ts-node --esm scripts/fetch-ticket.ts --ticket SAM1-123

# Output as JSON
npx ts-node --esm scripts/fetch-ticket.ts --ticket SAM1-123 --json
```

### start-work.ts

Full workflow to start development.

```bash
# Start work with all defaults
npx ts-node --esm scripts/start-work.ts --ticket SAM1-123

# Skip branch creation
npx ts-node --esm scripts/start-work.ts --ticket SAM1-123 --no-branch

# Skip status transition
npx ts-node --esm scripts/start-work.ts --ticket SAM1-123 --no-transition
```

### test-connection.ts

Verify Jira connectivity.

```bash
npx ts-node --esm scripts/test-connection.ts
```

## Integration with create-ticket

After creating a ticket with `create-ticket`, use this skill to start development:

```bash
# First, create the ticket
npx ts-node --esm skills/create-ticket/scripts/create-ticket.ts \
  --summary "Add search filters" --type Story

# Output: Created ticket SAM1-15

# Then start working on it
npx ts-node --esm skills/work-on-ticket/scripts/start-work.ts --ticket SAM1-15
```
