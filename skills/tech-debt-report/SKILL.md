---
name: tech-debt-report
description: Find TODOs, deprecated APIs, and outdated patterns in codebase
version: 1.0.0
author: Flight Booking Team
tags:
  - productivity
  - tech-debt
  - code-quality
  - refactoring
  - maintenance
---

# Tech Debt Report Generator

Scans the codebase to identify technical debt including TODO comments, deprecated API usage, outdated patterns, and potential refactoring opportunities.

## 🎯 Use Case Demo

### Scenario: Quarterly Tech Debt Assessment

**Before (Manual Process):**
> Tech Lead needs to assess tech debt for planning:
> 1. Grep for TODO and FIXME comments
> 2. Manually review code for deprecated APIs
> 3. Check for outdated patterns
> 4. Try to estimate effort for each item
> 5. Create Jira tickets manually
> 6. Prioritize based on gut feeling
> 
> **Time: 1-2 days, incomplete coverage**

**After (With This Skill):**
> Tech Lead: "Generate tech debt report for the codebase"
> 
> **Agent Response:**
> ```
> 🔧 TECHNICAL DEBT REPORT
> ═══════════════════════════════════════════════════════════════
> 
> 📅 Report Date: December 20, 2024
> 📁 Scanned: 47 files, 8,234 lines of code
> 
> ═══════════════════════════════════════════════════════════════
> 📊 DEBT SUMMARY
> ═══════════════════════════════════════════════════════════════
> 
> | Category | Count | Estimated Effort | Priority |
> |----------|-------|------------------|----------|
> | Critical TODOs | 3 | 2 days | 🔴 High |
> | Deprecated APIs | 5 | 1 day | 🔴 High |
> | Code Smells | 12 | 3 days | 🟡 Medium |
> | Old Patterns | 8 | 2 days | 🟡 Medium |
> | Minor TODOs | 15 | 1 day | 🟢 Low |
> | **TOTAL** | **43** | **9 days** | |
> 
> ═══════════════════════════════════════════════════════════════
> 🔴 CRITICAL ISSUES (Fix ASAP)
> ═══════════════════════════════════════════════════════════════
> 
> 1. 🚨 Security: Hardcoded API Key
>    📍 Services/PaymentService.cs:23
>    ```csharp
>    // TODO: Move to environment variable - URGENT
>    private const string ApiKey = "sk_live_xxxxx";
>    ```
>    ⏱️ Effort: 30 min
>    🎫 Suggested: Create Jira ticket with "security" label
> 
> 2. 🚨 Data Loss Risk: Missing Transaction
>    📍 Services/BookingService.cs:156
>    ```csharp
>    // FIXME: No transaction wrapper - can cause partial bookings
>    await _repository.CreateBooking(booking);
>    await _paymentService.Charge(payment);
>    ```
>    ⏱️ Effort: 2 hours
>    🎫 Suggested: High priority bug ticket
> 
> 3. 🚨 Deprecated: Newtonsoft.Json
>    📍 Multiple files (7 occurrences)
>    Issue: Using Newtonsoft.Json instead of System.Text.Json
>    Impact: Performance, security updates
>    ⏱️ Effort: 4 hours
>    🎫 Suggested: Refactoring ticket
> 
> ═══════════════════════════════════════════════════════════════
> 🟡 DEPRECATED API USAGE
> ═══════════════════════════════════════════════════════════════
> 
> | Location | Deprecated API | Replacement |
> |----------|----------------|-------------|
> | FlightsController.cs:45 | `DateTime.Now` | `DateTime.UtcNow` |
> | BookingService.cs:89 | `HttpClient()` | `IHttpClientFactory` |
> | FlightService.cs:34 | `GetAwaiter().GetResult()` | `async/await` |
> | SearchRequest.cs:12 | `[Obsolete] FlightClass` | `CabinClass` enum |
> | Program.cs:67 | `UseUrls()` | `WebApplication.Urls` |
> 
> ═══════════════════════════════════════════════════════════════
> 📝 TODO/FIXME COMMENTS
> ═══════════════════════════════════════════════════════════════
> 
> High Priority (blocking or risky):
>   📍 BookingService.cs:45 - TODO: Add retry logic for API calls
>   📍 PaymentService.cs:78 - FIXME: Handle timeout properly
>   📍 FlightService.cs:112 - TODO: Cache this query
> 
> Medium Priority (quality/performance):
>   📍 FlightsController.cs:89 - TODO: Add pagination
>   📍 BookingsController.cs:34 - TODO: Add input validation
>   📍 SearchRequest.cs:23 - TODO: Add date range validation
>   ... and 6 more
> 
> Low Priority (nice to have):
>   📍 Multiple files - TODO: Add XML documentation
>   📍 Models/*.cs - TODO: Add validation attributes
>   ... and 9 more
> 
> ═══════════════════════════════════════════════════════════════
> 🔄 OUTDATED PATTERNS
> ═══════════════════════════════════════════════════════════════
> 
> 1. Manual Dependency Injection
>    📍 Program.cs:23-45
>    Current: Manual service registration
>    Better: Use Scrutor for assembly scanning
>    Effort: 2 hours
> 
> 2. String Concatenation in Queries
>    📍 FlightService.cs:67
>    Current: String interpolation in SQL
>    Better: Parameterized queries or EF Core
>    Risk: SQL Injection (CRITICAL)
>    Effort: 1 hour
> 
> 3. Synchronous File I/O
>    📍 Services/LogService.cs:34
>    Current: File.WriteAllText()
>    Better: File.WriteAllTextAsync()
>    Effort: 15 min
> 
> ═══════════════════════════════════════════════════════════════
> 📋 RECOMMENDED ACTION PLAN
> ═══════════════════════════════════════════════════════════════
> 
> Sprint 1 (Immediate - 2 days):
>   □ Fix hardcoded API key (security)
>   □ Add transaction wrapper (data integrity)
>   □ Fix SQL injection vulnerability
> 
> Sprint 2 (Next - 3 days):
>   □ Migrate from Newtonsoft.Json
>   □ Fix deprecated HttpClient usage
>   □ Add retry logic to API calls
> 
> Sprint 3 (Planned - 4 days):
>   □ Clean up remaining TODOs
>   □ Modernize DI registration
>   □ Add missing validation
> 
> ═══════════════════════════════════════════════════════════════
> 🎫 CREATE JIRA TICKETS?
> ═══════════════════════════════════════════════════════════════
> 
> Say "Create tickets for critical tech debt" to automatically
> create Jira tickets for the high-priority items.
> 
> ═══════════════════════════════════════════════════════════════
> ```

**Time Saved: 1-2 days → 2 minutes (500x faster)**

---

## Agent Instructions

When this skill is activated:

1. **Scan for TODO/FIXME Comments**:
   - Search all source files for TODO, FIXME, HACK, XXX comments
   - Extract the comment text and file location
   - Parse any ticket references or priority indicators

2. **Check for Deprecated APIs**:
   - Look for `[Obsolete]` attributes
   - Check for known deprecated patterns:
     - `DateTime.Now` → `DateTime.UtcNow`
     - `new HttpClient()` → `IHttpClientFactory`
     - `GetAwaiter().GetResult()` → proper async
     - Newtonsoft.Json → System.Text.Json
   - Check for deprecated framework APIs

3. **Identify Code Smells**:
   - Long methods (>50 lines)
   - Large classes (>500 lines)
   - Deep nesting (>4 levels)
   - Magic numbers/strings
   - Duplicate code patterns

4. **Assess Security Issues**:
   - Hardcoded secrets/keys
   - SQL injection vulnerabilities
   - Missing input validation

5. **Categorize and Prioritize**:
   - Critical: Security, data integrity
   - High: Deprecated APIs, blocking TODOs
   - Medium: Performance, code quality
   - Low: Documentation, minor cleanup

6. **Estimate Effort**:
   - Based on scope and complexity
   - Consider testing requirements

7. **Generate Action Plan**:
   - Group into sprint-sized chunks
   - Prioritize by risk and impact

### Example Prompts

- "Generate tech debt report"
- "Find all TODO comments in the codebase"
- "Check for deprecated API usage"
- "What refactoring is needed?"
- "Show me code quality issues"

---

## Benefits

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Assessment time | 1-2 days | 2 min | 500x faster |
| Coverage | 60-70% | 100% | Complete scan |
| Prioritization | Subjective | Data-driven | Better decisions |
| Tracking | Ad-hoc | Systematic | Nothing forgotten |
