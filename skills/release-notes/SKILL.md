---
name: release-notes
description: Generates release notes and changelogs from merged PRs and commits between versions. Use when preparing releases, creating changelogs, or users mention "release notes", "changelog", "what's new", or version tags.
license: MIT
metadata:
  author: IHKREDDY
  version: "1.0"
  category: productivity
compatibility: Requires Git, GitHub CLI (gh)
---

# Release Notes Skill

## 🎯 Use Case Demo

### Scenario
*Team is releasing v2.0.0 after 3 weeks of development. Product manager needs release notes for stakeholders, and developers need a technical changelog.*

**Before (Manual):**
- Scroll through 47 merged PRs
- Read each one, categorize manually
- Write summary in Google Doc
- Format for different audiences
- **Time: 2-3 hours**

**After (With Skill):**
```markdown
# Flight Booking API v2.0.0 Release Notes

## 🚀 New Features
- **Seat Selection** - Passengers can now choose their preferred seats (#12)
- **Meal Preferences** - Add dietary requirements to bookings (#15)
- **Multi-city Flights** - Book complex itineraries (#18)

## 🐛 Bug Fixes
- Fixed booking confirmation email not sending (#23)
- Resolved timezone issues in flight schedules (#25)

## 🔧 Improvements
- 40% faster search response times (#20)
- Improved error messages for validation (#22)

## 📦 Dependencies
- Updated .NET to 9.0
- Upgraded Entity Framework to 9.0.1
```
**Time: 30 seconds**

### Time Saved: 2-3 hours per release

---

## When to Use This Skill

- Before creating a new release
- When preparing sprint demo notes
- For stakeholder communication
- Generating CHANGELOG.md updates

## Agent Instructions

When user asks for release notes:

1. **Identify version range**:
   - From: last release tag (e.g., v1.9.0)
   - To: current HEAD or specified tag

2. **Gather data**:
   ```bash
   # Get commits between versions
   git log v1.9.0..HEAD --oneline
   
   # Get merged PRs (with GitHub CLI)
   gh pr list --state merged --base main --json title,number,labels
   ```

3. **Categorize changes**:
   - Features (feat:, feature PRs)
   - Bug Fixes (fix:, bugfix PRs)
   - Breaking Changes (BREAKING:)
   - Dependencies (deps:, chore:)
   - Documentation (docs:)

4. **Generate formatted notes**:
   - Executive summary for stakeholders
   - Technical details for developers
   - Migration guide for breaking changes

### Example Prompts

User: "Generate release notes for v2.0.0"
→ Compare v1.9.0..v2.0.0, generate notes

User: "What changed since last release?"
→ Find last tag, summarize changes

User: "Create changelog entry"
→ Generate CHANGELOG.md format

## Demo Script

```bash
# 1. Show current state
git tag  # List existing releases

# 2. Ask agent: "Generate release notes from v1.0.0 to now"

# 3. Agent outputs categorized changelog

# 4. Copy to CHANGELOG.md or release page
```

## Output Formats

### Markdown (Default)
```markdown
## [2.0.0] - 2025-12-25
### Added
- Seat selection feature
### Fixed  
- Email notification bug
```

### Slack/Teams
```
🚀 *Flight Booking API v2.0.0*
✨ 3 new features | 🐛 5 bug fixes | 📦 2 dependency updates
```

### Jira Release
Links each item to Jira tickets automatically

## Benefits

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Release note creation | 2-3 hours | 30 seconds | ⬇️ 99% |
| Consistency | Variable | Standardized | ✅ 100% |
| Missing items | Common | None | ✅ Complete |
| Stakeholder updates | Delayed | Instant | ⬆️ Real-time |
