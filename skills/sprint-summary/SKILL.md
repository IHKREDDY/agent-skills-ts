---
name: sprint-summary
description: Generate sprint review summary from completed Jira tickets
version: 1.0.0
author: Flight Booking Team
tags:
  - productivity
  - jira
  - sprint
  - reporting
  - agile
---

# Sprint Summary Generator

Automatically generates comprehensive sprint review summaries by analyzing completed Jira tickets, merged PRs, and team velocity.

## 🎯 Use Case Demo

### Scenario: Sprint Review Meeting Preparation

**Before (Manual Process):**
> Scrum Master spends 2 hours before sprint review:
> 1. Open Jira, filter completed tickets
> 2. Copy each ticket title into a document
> 3. Group by epic/feature
> 4. Add story points completed
> 5. List what rolled over
> 6. Calculate velocity manually
> 7. Format for presentation
> 
> **Time: 2-3 hours, tedious work**

**After (With This Skill):**
> Scrum Master: "Generate sprint summary for Sprint 24"
> 
> **Agent Response:**
> ```
> 📊 SPRINT SUMMARY REPORT
> ═══════════════════════════════════════════════════════════════
> 
> 🏃 Sprint: Sprint 24 - "Flight Search Optimization"
> 📅 Duration: Dec 4 - Dec 18, 2024
> 👥 Team: Flight Booking Squad (5 developers)
> 
> ═══════════════════════════════════════════════════════════════
> 📈 KEY METRICS
> ═══════════════════════════════════════════════════════════════
> 
> | Metric | Planned | Completed | % |
> |--------|---------|-----------|---|
> | Story Points | 42 | 38 | 90% |
> | User Stories | 12 | 10 | 83% |
> | Bug Fixes | 5 | 7 | 140% |
> | Tech Debt | 3 | 3 | 100% |
> 
> 📊 Velocity Trend:
>    Sprint 22: 32 pts
>    Sprint 23: 35 pts
>    Sprint 24: 38 pts ⬆️ (+8.5%)
> 
> ═══════════════════════════════════════════════════════════════
> ✅ COMPLETED WORK BY EPIC
> ═══════════════════════════════════════════════════════════════
> 
> 🎯 Epic: Flight Search Performance (21 pts)
> ─────────────────────────────────────────────
>   ✅ FB-42: Add Redis caching for flight searches (8 pts)
>      → 70% reduction in search response time
>   ✅ FB-43: Implement search result pagination (5 pts)
>      → Handles 10K+ results efficiently
>   ✅ FB-44: Add search filters (price, time, airline) (5 pts)
>   ✅ FB-45: Search analytics dashboard (3 pts)
> 
> 🎯 Epic: Booking Reliability (12 pts)
> ─────────────────────────────────────────────
>   ✅ FB-38: Fix double-booking race condition (5 pts)
>      → Critical bug affecting 2% of bookings
>   ✅ FB-39: Add booking confirmation emails (5 pts)
>   ✅ FB-40: Implement booking retry logic (2 pts)
> 
> 🐛 Bug Fixes (5 pts)
> ─────────────────────────────────────────────
>   ✅ FB-51: Payment timeout not handled (2 pts)
>   ✅ FB-52: Date picker timezone issue (1 pt)
>   ✅ FB-53: Mobile layout broken on checkout (1 pt)
>   ✅ FB-54: Email special characters escaped (1 pt)
>   ✅ FB-55: Fix rate limiting error message (0.5 pt)
>   ✅ FB-56: Correct flight duration calculation (0.5 pt)
>   ✅ FB-57: Fix seat map display (0 pts - quick fix)
> 
> ═══════════════════════════════════════════════════════════════
> 🔄 ROLLED OVER TO NEXT SPRINT
> ═══════════════════════════════════════════════════════════════
> 
>   ⏳ FB-46: Multi-city search feature (8 pts)
>      Reason: Blocked by API integration delay
>   ⏳ FB-47: Guest checkout option (5 pts)
>      Reason: Design review pending
> 
> ═══════════════════════════════════════════════════════════════
> 🔀 PULL REQUESTS MERGED
> ═══════════════════════════════════════════════════════════════
> 
> Total PRs Merged: 18
> Average Review Time: 4.2 hours
> 
> Largest PRs:
>   • #234 - Redis caching implementation (1,247 lines)
>   • #241 - Booking email templates (856 lines)
>   • #238 - Search filters component (623 lines)
> 
> ═══════════════════════════════════════════════════════════════
> 🏆 TEAM HIGHLIGHTS
> ═══════════════════════════════════════════════════════════════
> 
> 👤 Sarah: 15 pts - Search caching champion
> 👤 Mike: 12 pts - Booking reliability hero
> 👤 Alex: 8 pts - Bug squasher (7 bugs fixed!)
> 👤 Kim: 3 pts - Documentation & testing
> 
> ═══════════════════════════════════════════════════════════════
> 💡 RECOMMENDATIONS FOR NEXT SPRINT
> ═══════════════════════════════════════════════════════════════
> 
> Based on this sprint's data:
> • Suggested velocity: 40 pts (slightly optimistic)
> • Carry-over work: 13 pts already committed
> • Available capacity: ~27 pts for new work
> • Risk: API integration blocker may continue
> 
> ═══════════════════════════════════════════════════════════════
> ```

**Time Saved: 2.5 hours → 30 seconds (300x faster)**

---

## Agent Instructions

When this skill is activated:

1. **Identify Sprint**:
   - Get sprint name/number from user or find current sprint
   - Use Atlassian MCP to get sprint details and date range

2. **Gather Completed Work**:
   - JQL: `sprint = "Sprint X" AND status = Done`
   - Group by Epic/parent
   - Sum story points by category

3. **Analyze Velocity**:
   - Compare with previous 2-3 sprints
   - Calculate trend (improving, stable, declining)
   - Note any anomalies

4. **Find Rolled Over Items**:
   - JQL: `sprint = "Sprint X" AND status != Done`
   - Note reasons from comments if available

5. **Pull Request Analysis**:
   - Use GitHub to find PRs merged during sprint
   - Calculate review times
   - Identify largest changes

6. **Team Contribution** (optional):
   - Break down by assignee
   - Highlight achievements

7. **Format Report**:
   - Use clear sections with emoji icons
   - Include tables for metrics
   - Make it presentation-ready

### Example Prompts

- "Generate sprint summary for Sprint 24"
- "Create sprint review report"
- "What did we complete this sprint?"
- "Prepare sprint retrospective data"
- "Show me sprint velocity trends"

---

## Benefits

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Prep time | 2.5 hours | 30 sec | 300x faster |
| Data accuracy | Manual errors | Automated | 100% accurate |
| Consistency | Variable | Standardized | Better comparisons |
| Team visibility | Limited | Complete | Recognition for all |
