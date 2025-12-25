---
name: dependency-update
description: Check for outdated packages and create update PRs
version: 1.0.0
author: Flight Booking Team
tags:
  - productivity
  - dependencies
  - security
  - maintenance
  - nuget
  - npm
---

# Dependency Update Manager

Analyzes project dependencies, identifies outdated or vulnerable packages, and creates organized PRs to update them safely.

## 🎯 Use Case Demo

### Scenario: Monthly Dependency Maintenance

**Before (Manual Process):**
> Developer spends Friday afternoon on dependency updates:
> 1. Run `dotnet list package --outdated` - copy results somewhere
> 2. Research each package: breaking changes? security fixes?
> 3. Update one by one, hoping nothing breaks
> 4. Run tests, find something broke
> 5. Debug for 2 hours
> 6. Give up on some updates, leave for "later"
> 
> **Time: 4-6 hours, often incomplete**

**After (With This Skill):**
> Developer: "Check for dependency updates and create PRs"
> 
> **Agent Response:**
> ```
> 📦 DEPENDENCY UPDATE REPORT
> ═══════════════════════════════════════════════════════════════
> 
> 🔍 Scanned: FlightBookingAPI.csproj
> 📅 Report Date: December 20, 2024
> 
> ═══════════════════════════════════════════════════════════════
> 🚨 SECURITY UPDATES (Critical - Update Immediately)
> ═══════════════════════════════════════════════════════════════
> 
> | Package | Current | Latest | Severity | CVE |
> |---------|---------|--------|----------|-----|
> | System.Text.Json | 7.0.2 | 7.0.4 | HIGH | CVE-2024-1234 |
> | Microsoft.Data.SqlClient | 5.1.0 | 5.1.4 | MEDIUM | CVE-2024-5678 |
> 
> ✅ Created PR #241: "🚨 Security: Update packages with known vulnerabilities"
>    → https://github.com/org/flight-booking/pull/241
>    → Labels: security, dependencies, critical
> 
> ═══════════════════════════════════════════════════════════════
> ⬆️ MINOR/PATCH UPDATES (Safe to Update)
> ═══════════════════════════════════════════════════════════════
> 
> | Package | Current | Latest | Type | Notes |
> |---------|---------|--------|------|-------|
> | Swashbuckle.AspNetCore | 6.5.0 | 6.6.2 | Minor | New features |
> | FluentValidation | 11.8.0 | 11.9.0 | Minor | Bug fixes |
> | Serilog | 3.1.0 | 3.1.1 | Patch | Performance |
> | xunit | 2.6.1 | 2.6.4 | Patch | Bug fixes |
> 
> ✅ Created PR #242: "chore(deps): Update minor/patch dependencies"
>    → https://github.com/org/flight-booking/pull/242
>    → Labels: dependencies, minor
> 
> ═══════════════════════════════════════════════════════════════
> ⚠️ MAJOR UPDATES (Review Required)
> ═══════════════════════════════════════════════════════════════
> 
> | Package | Current | Latest | Breaking Changes |
> |---------|---------|--------|------------------|
> | AutoMapper | 12.0.1 | 13.0.0 | Yes - Profile changes |
> | MediatR | 11.1.0 | 12.2.0 | Yes - New registration |
> 
> 📝 Created Issue #243: "Evaluate major dependency updates"
>    → https://github.com/org/flight-booking/issues/243
>    → Contains migration guides and breaking change analysis
> 
> ═══════════════════════════════════════════════════════════════
> ✅ UP TO DATE (No Action Needed)
> ═══════════════════════════════════════════════════════════════
> 
> Microsoft.AspNetCore.* packages - Latest
> Microsoft.EntityFrameworkCore - 8.0.0 (Latest)
> 
> ═══════════════════════════════════════════════════════════════
> 📊 SUMMARY
> ═══════════════════════════════════════════════════════════════
> 
> Total packages: 24
> Up to date: 18 (75%)
> Security updates: 2 (PR #241 ready)
> Minor updates: 4 (PR #242 ready)
> Major updates: 2 (Issue #243 for review)
> 
> ═══════════════════════════════════════════════════════════════
> ```

**Time Saved: 5 hours → 10 minutes (30x faster, more thorough)**

---

## Agent Instructions

When this skill is activated:

1. **Scan Dependencies**:
   - For .NET: `dotnet list package --outdated`
   - For Node.js: `npm outdated` or `yarn outdated`
   - For Python: `pip list --outdated`
   - Parse all project files for dependencies

2. **Check Security Advisories**:
   - Query GitHub Advisory Database
   - Check NVD (National Vulnerability Database)
   - Identify CVEs affecting current versions

3. **Categorize Updates**:
   - **Security**: Any package with known CVE
   - **Patch**: x.y.Z changes (bug fixes)
   - **Minor**: x.Y.z changes (new features, backward compatible)
   - **Major**: X.y.z changes (breaking changes)

4. **Research Breaking Changes**:
   - For major updates, fetch release notes
   - Identify breaking changes and migration steps
   - Assess impact on codebase

5. **Create Appropriate PRs**:
   - Security updates: Single PR, urgent labels
   - Minor/Patch: Combined PR, low priority
   - Major: Create issue with analysis, not PR

6. **Include Context**:
   - Link to changelogs in PR description
   - Note any code changes needed
   - Add testing recommendations

### Example Prompts

- "Check for dependency updates"
- "Are there any security vulnerabilities in our packages?"
- "Update all minor dependencies"
- "Create a dependency update report"
- "What packages need updating?"

---

## Supported Package Managers

| Platform | Package Manager | Security Check |
|----------|-----------------|----------------|
| .NET | NuGet | ✅ GitHub Advisory |
| Node.js | npm/yarn/pnpm | ✅ npm audit |
| Python | pip/poetry | ✅ safety check |
| Java | Maven/Gradle | ✅ OWASP check |

---

## Benefits

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Update time | 5 hours | 10 min | 30x faster |
| Security coverage | Reactive | Proactive | Prevent breaches |
| Update frequency | Quarterly | Weekly | Always current |
| Breaking changes | Surprise | Documented | No surprises |
