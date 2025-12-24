---
name: code-review
description: Provides code review guidelines, checklists, and best practices for reviewing pull requests. Use when reviewing code, preparing for code review, or when users mention "code review", "review PR", "review checklist", or "code quality".
license: MIT
metadata:
  author: IHKREDDY
  version: "1.0"
  category: development
compatibility: Works with any programming language or framework
---

# Code Review Skill

## When to Use This Skill

Use this skill when:
- Reviewing a pull request
- Preparing code for review
- Looking for code review best practices
- Users mention "code review", "review PR", or "review checklist"

## Code Review Checklist

### 1. Functionality
- [ ] Code does what the ticket/PR description says
- [ ] Edge cases are handled
- [ ] Error handling is appropriate
- [ ] No obvious bugs or logic errors

### 2. Code Quality
- [ ] Code is readable and self-documenting
- [ ] Functions/methods are focused and small
- [ ] No code duplication (DRY principle)
- [ ] Naming is clear and consistent
- [ ] No dead code or commented-out code

### 3. Architecture
- [ ] Changes follow existing patterns
- [ ] No unnecessary dependencies added
- [ ] Separation of concerns maintained
- [ ] SOLID principles followed

### 4. Testing
- [ ] Unit tests added for new code
- [ ] Tests cover edge cases
- [ ] All tests pass
- [ ] Test names are descriptive

### 5. Security
- [ ] No hardcoded secrets or credentials
- [ ] Input validation present
- [ ] No SQL injection vulnerabilities
- [ ] Authentication/authorization checked

### 6. Performance
- [ ] No obvious performance issues
- [ ] Database queries are optimized
- [ ] No unnecessary loops or iterations
- [ ] Caching considered where appropriate

### 7. Documentation
- [ ] Public APIs are documented
- [ ] Complex logic has comments
- [ ] README updated if needed
- [ ] Breaking changes documented

## Review Comment Guidelines

### Be Constructive
**Good:** "Consider using a dictionary here for O(1) lookup instead of a list."
**Bad:** "This is slow."

### Explain Why
**Good:** "This could cause a null reference exception if `user` is null. Consider adding a null check."
**Bad:** "Add null check."

### Suggest Solutions
**Good:** "You could simplify this with LINQ: `users.Where(u => u.IsActive).ToList()`"
**Bad:** "Simplify this."

### Use Questions for Preferences
**Good:** "What do you think about extracting this into a separate method?"
**Bad:** "Extract this."

## Review Process

1. **Understand Context**: Read the ticket/PR description first
2. **High-Level Pass**: Review overall structure and approach
3. **Detailed Review**: Line-by-line review for issues
4. **Test Coverage**: Verify tests are adequate
5. **Documentation**: Check for necessary documentation
6. **Approve or Request Changes**: Provide clear feedback

## Language-Specific Guidelines

### C# / .NET
- Follow Microsoft naming conventions
- Use async/await properly
- Dispose IDisposable resources
- Use nullable reference types

### TypeScript / JavaScript
- Avoid `any` type
- Use const/let, not var
- Handle promises properly
- Use optional chaining and nullish coalescing

### Python
- Follow PEP 8 style guide
- Use type hints
- Handle exceptions appropriately
- Use context managers for resources

## Common Issues to Watch For

| Issue | What to Look For |
|-------|-----------------|
| Memory Leaks | Unsubscribed events, unclosed connections |
| Race Conditions | Shared state in async code |
| N+1 Queries | Database queries in loops |
| Magic Numbers | Unexplained numeric constants |
| Long Methods | Methods > 50 lines |
| Deep Nesting | More than 3 levels of indentation |
