---
name: api-docs
description: Generate OpenAPI/Swagger documentation from code
version: 1.0.0
author: Flight Booking Team
tags:
  - productivity
  - documentation
  - api
  - openapi
  - swagger
---

# API Documentation Generator

Automatically generates comprehensive OpenAPI/Swagger documentation from your API code, including endpoints, request/response schemas, and usage examples.

## 🎯 Use Case Demo

### Scenario: API Documentation for External Consumers

**Before (Manual Process):**
> Team needs to document API for partner integration:
> 1. Open each controller, list endpoints manually
> 2. Document request/response formats in Word doc
> 3. Write example requests in Postman
> 4. Export Postman collection
> 5. Code changes → documentation out of sync
> 6. Partners report incorrect documentation
> 
> **Time: 1-2 days, always outdated**

**After (With This Skill):**
> Developer: "Generate API documentation for FlightBookingAPI"
> 
> **Agent Response:**
> ```
> 📚 API DOCUMENTATION GENERATED
> ═══════════════════════════════════════════════════════════════
> 
> 🌐 API: Flight Booking API
> 📌 Version: 1.0.0
> 🔗 Base URL: https://api.flightbooking.com/v1
> 
> ═══════════════════════════════════════════════════════════════
> 📋 ENDPOINTS DOCUMENTED
> ═══════════════════════════════════════════════════════════════
> 
> ✈️ FLIGHTS
> ─────────────────────────────────────────────
> 
> GET /api/flights
>   📝 Search for available flights
>   🔐 Auth: None (public)
>   
>   Query Parameters:
>   | Name | Type | Required | Description |
>   |------|------|----------|-------------|
>   | origin | string | ✅ | IATA airport code (e.g., "JFK") |
>   | destination | string | ✅ | IATA airport code (e.g., "LAX") |
>   | departureDate | date | ✅ | Format: YYYY-MM-DD |
>   | passengers | integer | ❌ | Default: 1, Max: 9 |
>   | cabinClass | string | ❌ | economy, business, first |
>   
>   Response 200:
>   ```json
>   {
>     "flights": [
>       {
>         "id": 123,
>         "flightNumber": "AA1234",
>         "airline": "American Airlines",
>         "origin": "JFK",
>         "destination": "LAX",
>         "departureTime": "2024-12-25T08:00:00Z",
>         "arrivalTime": "2024-12-25T11:30:00Z",
>         "duration": "5h 30m",
>         "price": {
>           "amount": 299.99,
>           "currency": "USD"
>         },
>         "seatsAvailable": 45
>       }
>     ],
>     "totalResults": 24,
>     "page": 1,
>     "pageSize": 10
>   }
>   ```
>   
>   Example cURL:
>   ```bash
>   curl -X GET "https://api.flightbooking.com/v1/api/flights?\
>   origin=JFK&destination=LAX&departureDate=2024-12-25" \
>   -H "Accept: application/json"
>   ```
> 
> GET /api/flights/{id}
>   📝 Get flight details by ID
>   🔐 Auth: None (public)
>   
>   Path Parameters:
>   | Name | Type | Description |
>   |------|------|-------------|
>   | id | integer | Flight ID |
>   
>   Response 200: Flight object
>   Response 404: Flight not found
> 
> ─────────────────────────────────────────────
> 🎫 BOOKINGS
> ─────────────────────────────────────────────
> 
> POST /api/bookings
>   📝 Create a new booking
>   🔐 Auth: Bearer Token (required)
>   
>   Request Body:
>   ```json
>   {
>     "flightId": 123,
>     "passengers": [
>       {
>         "firstName": "John",
>         "lastName": "Doe",
>         "email": "john.doe@email.com",
>         "dateOfBirth": "1990-01-15",
>         "passportNumber": "AB1234567"
>       }
>     ],
>     "contactEmail": "john.doe@email.com",
>     "paymentMethod": "card"
>   }
>   ```
>   
>   Response 201:
>   ```json
>   {
>     "bookingId": "BK-2024-789456",
>     "status": "confirmed",
>     "totalPrice": 299.99,
>     "currency": "USD",
>     "confirmationSentTo": "john.doe@email.com"
>   }
>   ```
>   
>   Error Responses:
>   | Status | Description |
>   |--------|-------------|
>   | 400 | Invalid request body |
>   | 401 | Authentication required |
>   | 404 | Flight not found |
>   | 409 | No seats available |
>   | 422 | Validation failed |
> 
> GET /api/bookings/{id}
>   📝 Get booking by ID
>   🔐 Auth: Bearer Token (owner or admin)
> 
> DELETE /api/bookings/{id}
>   📝 Cancel a booking
>   🔐 Auth: Bearer Token (owner or admin)
>   
>   Response 200: Cancellation confirmed with refund details
>   Response 400: Booking not cancellable (past departure)
> 
> ═══════════════════════════════════════════════════════════════
> 📄 FILES GENERATED
> ═══════════════════════════════════════════════════════════════
> 
> ✅ docs/api/openapi.yaml - OpenAPI 3.0 specification
> ✅ docs/api/README.md - Human-readable documentation
> ✅ docs/api/postman-collection.json - Postman import file
> ✅ docs/api/examples/ - Request/response examples
> 
> ═══════════════════════════════════════════════════════════════
> 🔗 SWAGGER UI
> ═══════════════════════════════════════════════════════════════
> 
> Your API documentation is available at:
> http://localhost:5000/swagger
> 
> The OpenAPI spec has been updated with:
> • 4 endpoints documented
> • 3 schema definitions
> • 12 example responses
> • Authentication configuration
> 
> ═══════════════════════════════════════════════════════════════
> ```

**Time Saved: 2 days → 5 minutes (500x faster, always accurate)**

---

## Agent Instructions

When this skill is activated:

1. **Analyze Controllers**:
   - Find all API controller classes
   - Extract endpoints (routes, HTTP methods)
   - Parse route templates and parameters

2. **Extract Request/Response Models**:
   - Find parameter types and model classes
   - Document properties with types
   - Note required vs optional fields
   - Include validation rules

3. **Identify Authentication**:
   - Check for [Authorize] attributes
   - Note authentication schemes
   - Document required scopes/roles

4. **Generate Examples**:
   - Create realistic example requests
   - Generate sample responses
   - Include error response examples

5. **Create OpenAPI Spec**:
   - Generate openapi.yaml file
   - Include all paths and schemas
   - Add descriptions and examples
   - Configure security schemes

6. **Generate Human-Readable Docs**:
   - Create Markdown documentation
   - Organize by resource/feature
   - Include cURL examples
   - Add quick-start guide

7. **Export Formats**:
   - OpenAPI 3.0 YAML
   - Postman collection
   - Markdown documentation

### Example Prompts

- "Generate API documentation"
- "Create OpenAPI spec for our API"
- "Document the Flights endpoint"
- "Export Postman collection from API"
- "Update Swagger documentation"

---

## Output Formats

| Format | File | Use Case |
|--------|------|----------|
| OpenAPI 3.0 | openapi.yaml | Standard spec, tools |
| Swagger UI | /swagger | Interactive testing |
| Markdown | README.md | GitHub, wikis |
| Postman | collection.json | Team testing |
| cURL | examples.md | Quick testing |

---

## Benefits

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Documentation time | 2 days | 5 min | 500x faster |
| Accuracy | Often wrong | Always correct | From code source |
| Maintenance | Manual updates | Auto-generated | Zero effort |
| Partner onboarding | 1 week | 1 day | 5x faster |
