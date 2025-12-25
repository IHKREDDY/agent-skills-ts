---
name: standup-report
description: Generate daily standup summary from Git commits and Jira activity
version: 1.0.0
author: Flight Booking Team
tags:
  - productivity
  - git
  - jira
  - standup
  - reporting
---

# Standup Report Generator

Automatically generates a comprehensive daily standup report by analyzing your Git commits from the past day and Jira ticket activity.

## 🎯 Use Case Demo

### Scenario: Morning Standup Meeting

**Before (Manual Process):**
> Developer Sarah spends 10 minutes every morning trying to remember what she worked on yesterday:
> - Opens Git log, scrolls through commits
> - Opens Jira, checks her activity feed
> - Opens browser history to find PRs she reviewed
> - Types up a summary in Slack
> - Often forgets important items

**After (With This Skill):**
> Sarah: "Generate my standup report for yesterday"
> 
> **Agent Response:**
> ```
> 📋 DAILY STANDUP REPORT - Sarah Johnson
> ═══════════════════════════════════════════════════════════════
> 
> 📅 Date: December 19, 2024
> 
> ✅ WHAT I DID YESTERDAY:
> ─────────────────────────
> 🔧 Code Changes (5 commits):
>   • feat(api): Add pagination to flights endpoint (FB-42)
>   • fix(booking): Resolve double-charge issue (FB-38)
>   • test: Add integration tests for payment flow
>   • refactor: Clean up flight search service
>   • docs: Update API documentation for v2 endpoints
> 
> 🎫 Jira Activity:
>   • FB-42: Moved to "Done" - Flight pagination feature
>   • FB-38: Resolved - Critical payment bug
>   • FB-45: Added comment with technical details
>   • FB-50: Started work - Booking confirmation emails
> 
> 🔀 Pull Requests:
>   • #127 - Merged: Pagination feature
>   • #125 - Reviewed: Team member's auth changes
> 
> 🚧 WHAT I'M DOING TODAY:
> ─────────────────────────
> Based on your current assignments:
>   • FB-50: Booking confirmation emails (In Progress)
>   • FB-52: Email template design (To Do)
> 
> 🚫 BLOCKERS:
> ─────────────────────────
>   • FB-50: Waiting for email service credentials from DevOps
> 
> ═══════════════════════════════════════════════════════════════
> ```

**Time Saved: 10 minutes → 10 seconds (60x faster)**

---

## Agent Instructions

When this skill is activated:

1. **Gather Git Activity**:
   - Run `git log --oneline --since="yesterday" --author="$(git config user.email)"`
   - Parse commit messages for ticket references (FB-XX, DEV-XX format)
   - Count commits and categorize by type (feat, fix, docs, etc.)

2. **Gather Jira Activity**:
   - Use Atlassian MCP to search for issues updated by user in last 24 hours
   - Query: `updatedDate >= -1d AND (assignee = currentUser() OR comment ~ currentUser())`
   - Note status transitions and comments added

3. **Check Current Work**:
   - Find tickets currently assigned in "In Progress" status
   - Find tickets in "To Do" that are assigned to user

4. **Identify Blockers**:
   - Look for tickets with "blocked" label or in "Blocked" status
   - Check for tickets with comments mentioning "waiting", "blocked", "need"

5. **Format Report**:
   - Use clear sections with emoji icons
   - Group related items together
   - Highlight blockers prominently
   - Make it copy-paste ready for Slack/Teams

### Example Prompts

- "Generate my standup report"
- "What did I work on yesterday?"
- "Create standup summary for the team meeting"
- "Prepare my daily status update"

---

## Benefits

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Time to prepare standup | 10 min | 10 sec | 60x faster |
| Items forgotten | 2-3 per day | 0 | 100% complete |
| Standup meeting delays | Frequent | Rare | Smoother meetings |
| Consistency of format | Variable | Standard | Better team communication |
