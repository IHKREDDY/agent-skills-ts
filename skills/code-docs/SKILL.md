---
name: code-docs
description: Generate or update documentation from code analysis
version: 1.0.0
author: Flight Booking Team
tags:
  - productivity
  - documentation
  - code-analysis
  - readme
---

# Code Documentation Generator

Automatically generates comprehensive documentation by analyzing code structure, comments, and patterns. Creates README files, API docs, and inline documentation.

## 🎯 Use Case Demo

### Scenario: New Service Needs Documentation

**Before (Manual Process):**
> Developer Mike creates a new BookingService class with 15 methods. Now he needs to document it:
> - Writes README manually - 45 minutes
> - Adds XML comments to each method - 30 minutes
> - Creates usage examples - 20 minutes
> - Forgets to update docs when code changes
> - Total: 1.5+ hours

**After (With This Skill):**
> Mike: "Generate documentation for BookingService.cs"
> 
> **Agent Response:**
> ```markdown
> # BookingService Documentation
> 
> ## Overview
> The `BookingService` manages flight booking operations including
> creation, modification, cancellation, and payment processing.
> 
> ## Dependencies
> - `IFlightService` - Flight availability checking
> - `IPaymentGateway` - Payment processing
> - `IEmailService` - Confirmation emails
> - `IBookingRepository` - Data persistence
> 
> ## Methods
> 
> ### CreateBookingAsync
> Creates a new flight booking for a passenger.
> 
> **Parameters:**
> | Name | Type | Description |
> |------|------|-------------|
> | flightId | int | The ID of the flight to book |
> | passenger | PassengerInfo | Passenger details |
> | paymentInfo | PaymentDetails | Payment information |
> 
> **Returns:** `Task<BookingResult>` - Booking confirmation with reference number
> 
> **Throws:**
> - `FlightFullException` - When no seats available
> - `PaymentFailedException` - When payment is declined
> 
> **Example:**
> ```csharp
> var result = await bookingService.CreateBookingAsync(
>     flightId: 123,
>     passenger: new PassengerInfo("John", "Doe", "john@email.com"),
>     paymentInfo: new PaymentDetails(cardNumber, expiry, cvv)
> );
> Console.WriteLine($"Booking confirmed: {result.ReferenceNumber}");
> ```
> 
> ### CancelBookingAsync
> Cancels an existing booking and processes refund if applicable.
> ...
> ```
> 
> **Files Generated:**
> - `docs/BookingService.md` - Full documentation
> - Updated XML comments in `BookingService.cs`
> - Added to `docs/README.md` index

**Time Saved: 1.5 hours → 2 minutes (45x faster)**

---

## Agent Instructions

When this skill is activated:

1. **Analyze Code Structure**:
   - Parse the target file(s) using language-specific analysis
   - Extract classes, methods, properties, and their signatures
   - Identify dependencies and inheritance relationships
   - Find existing comments and documentation

2. **Infer Documentation**:
   - Use method names and parameters to describe purpose
   - Analyze method body to understand behavior
   - Identify exceptions that can be thrown
   - Find return value types and meanings

3. **Generate Documentation**:
   - Create comprehensive Markdown documentation
   - Include code examples based on usage patterns
   - Add parameter tables with types and descriptions
   - Document exceptions and edge cases

4. **Update Inline Comments**:
   - Add or update XML documentation comments (C#)
   - Add or update JSDoc comments (JavaScript/TypeScript)
   - Add or update docstrings (Python)

5. **Create Index**:
   - Update or create docs/README.md with links
   - Organize by namespace/module
   - Add navigation structure

### Example Prompts

- "Generate documentation for the Services folder"
- "Document the FlightController class"
- "Create a README for this project"
- "Add XML comments to BookingService.cs"
- "Update docs for the Models folder"

---

## Supported Languages

| Language | Inline Docs | Markdown | Examples |
|----------|-------------|----------|----------|
| C# | XML Comments | ✅ | ✅ |
| TypeScript | JSDoc | ✅ | ✅ |
| JavaScript | JSDoc | ✅ | ✅ |
| Python | Docstrings | ✅ | ✅ |
| Java | Javadoc | ✅ | ✅ |

---

## Benefits

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Documentation time | 1.5 hours | 2 min | 45x faster |
| Doc coverage | 30-40% | 95%+ | 2.5x coverage |
| Doc accuracy | Outdated | Current | Always in sync |
| New dev onboarding | 2-3 days | 1 day | 60% faster |
