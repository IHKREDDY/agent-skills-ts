---
name: hotfix-workflow
description: Rapid hotfix branch creation, fix application, and PR to main
version: 1.0.0
author: Flight Booking Team
tags:
  - productivity
  - git
  - hotfix
  - emergency
  - workflow
---

# Hotfix Workflow

Streamlined emergency hotfix process: creates hotfix branch from main/master, applies the fix, runs quick validation, and creates PR for immediate merge.

## 🎯 Use Case Demo

### Scenario: Production Critical Bug

**Before (Manual Process):**
> Alert: Payment processing is failing in production!
> 
> Developer scrambles:
> 1. `git stash` current work (forget which branch)
> 2. `git checkout main && git pull`
> 3. `git checkout -b hotfix/payment-fix`
> 4. Find the bug, make the fix
> 5. `git add . && git commit -m "fix payment"`
> 6. `git push -u origin hotfix/payment-fix`
> 7. Open browser, navigate to GitHub, create PR
> 8. Wait for review, merge
> 9. Remember to go back to original work
> 
> **Time: 20-30 minutes under pressure, error-prone**

**After (With This Skill):**
> Developer: "Apply hotfix for FB-99: Payment null reference error in PaymentService.cs line 45"
> 
> **Agent Response:**
> ```
> 🚨 HOTFIX WORKFLOW INITIATED
> ═══════════════════════════════════════════════════════════════
> 
> 📋 Ticket: FB-99 - Payment processing failing in production
> 
> Step 1/5: Saving Current Work
> ✅ Stashed current changes: "WIP: feature/email-templates"
> ✅ Noted return branch: feature/email-templates
> 
> Step 2/5: Creating Hotfix Branch
> ✅ Fetched latest from origin/main
> ✅ Created branch: hotfix/FB-99-payment-null-fix
> 
> Step 3/5: Applying Fix
> ✅ Fixed null reference in PaymentService.cs:45
>    - Added null check before accessing PaymentDetails
>    - Added logging for debugging
> 
> Step 4/5: Quick Validation
> ✅ Build successful
> ✅ Unit tests passed (127/127)
> ✅ PaymentService tests passed (12/12)
> 
> Step 5/5: Creating Emergency PR
> ✅ Committed: "fix(payment): add null check for PaymentDetails (FB-99)"
> ✅ Pushed to origin/hotfix/FB-99-payment-null-fix
> 
> ════════════════════════════════════════════════════════════════
> 🔗 PULL REQUEST CREATED:
>    https://github.com/org/flight-booking/pull/234
> ════════════════════════════════════════════════════════════════
> 
> 📌 PR Details:
>    Title: 🚨 HOTFIX: Fix payment null reference (FB-99)
>    Base: main
>    Labels: hotfix, critical, production
>    Reviewers: @senior-dev, @tech-lead (auto-assigned)
> 
> 🔙 To return to your previous work:
>    Run: git checkout feature/email-templates && git stash pop
> 
> ═══════════════════════════════════════════════════════════════
> ```

**Time Saved: 25 minutes → 3 minutes (8x faster, less stress)**

---

## Agent Instructions

When this skill is activated:

1. **Save Current Context**:
   - Record current branch name
   - Stash any uncommitted changes with descriptive message
   - Note this for later restoration

2. **Create Hotfix Branch**:
   - `git fetch origin main`
   - `git checkout main && git pull`
   - Create branch: `hotfix/[TICKET-ID]-[brief-description]`

3. **Apply the Fix**:
   - Analyze the issue from the Jira ticket or user description
   - Make the minimal necessary code change
   - Follow existing code patterns
   - Add defensive coding (null checks, error handling)

4. **Validate Quickly**:
   - Run `dotnet build` or equivalent
   - Run relevant unit tests only (not full suite)
   - Check for obvious issues

5. **Create Emergency PR**:
   - Commit with conventional format: `fix(scope): description (TICKET-ID)`
   - Push to origin
   - Create PR with:
     - 🚨 HOTFIX prefix in title
     - Link to Jira ticket
     - Labels: hotfix, critical
     - Auto-assign senior reviewers
   - Add Jira ticket link in PR description

6. **Provide Return Instructions**:
   - Show command to return to previous work
   - Include stash pop if needed

### Example Prompts

- "Apply hotfix for FB-99"
- "Emergency fix for payment bug in PaymentService"
- "Create hotfix branch for production issue PROD-123"
- "Quick fix for the null reference error customers are seeing"

---

## Safety Features

| Feature | Description |
|---------|-------------|
| Auto-stash | Never lose current work |
| Branch tracking | Always know where to return |
| Minimal changes | Only fix the issue, nothing else |
| Quick validation | Catch obvious breaks before PR |
| Senior review | Auto-assign experienced reviewers |

---

## Benefits

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Hotfix time | 25 min | 3 min | 8x faster |
| Stress level | High | Low | Calm process |
| Errors made | Common | Rare | Automated steps |
| MTTR | 45 min | 15 min | 3x faster recovery |
