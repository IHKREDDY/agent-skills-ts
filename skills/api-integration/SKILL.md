---
name: api-integration
description: Design and implement REST API integrations with proper error handling, authentication, rate limiting, and testing. Use when building API clients, integrating third-party services, or when users mention API, REST, webhooks, HTTP requests, or service integration.
license: MIT
metadata:
  author: IHKREDDY
  version: "1.0"
  category: integration
compatibility: Works with any programming language or framework
---

# API Integration Skill

## When to Use This Skill

Use this skill when:
- Building a client to consume a REST API
- Integrating third-party services
- Implementing webhooks
- Creating or testing HTTP endpoints
- Users mention "API", "REST", "integration", or "HTTP"

## Integration Process

### 1. API Discovery & Planning

**Understand the API:**
- Review API documentation thoroughly
- Identify base URL and API version
- Note authentication requirements
- Check rate limits and quotas
- Review error response formats

### 2. Authentication Patterns

#### API Key
```csharp
// C#
httpClient.DefaultRequestHeaders.Add("X-API-Key", apiKey);
```

```typescript
// TypeScript
headers: { 'X-API-Key': process.env.API_KEY }
```

#### Bearer Token
```csharp
// C#
httpClient.DefaultRequestHeaders.Authorization = 
    new AuthenticationHeaderValue("Bearer", token);
```

```typescript
// TypeScript
headers: { 'Authorization': `Bearer ${token}` }
```

#### Basic Auth
```csharp
// C#
var credentials = Convert.ToBase64String(
    Encoding.UTF8.GetBytes($"{username}:{password}")
);
httpClient.DefaultRequestHeaders.Authorization = 
    new AuthenticationHeaderValue("Basic", credentials);
```

### 3. Client Implementation

#### C# / .NET
```csharp
public class ApiClient
{
    private readonly HttpClient _httpClient;
    private readonly string _baseUrl;

    public ApiClient(string baseUrl, string apiKey)
    {
        _httpClient = new HttpClient();
        _httpClient.DefaultRequestHeaders.Add("X-API-Key", apiKey);
        _baseUrl = baseUrl.TrimEnd('/');
    }

    public async Task<T?> GetAsync<T>(string endpoint)
    {
        var response = await _httpClient.GetAsync($"{_baseUrl}/{endpoint}");
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<T>(json);
    }

    public async Task<T?> PostAsync<T>(string endpoint, object data)
    {
        var json = JsonSerializer.Serialize(data);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var response = await _httpClient.PostAsync($"{_baseUrl}/{endpoint}", content);
        response.EnsureSuccessStatusCode();
        var responseJson = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<T>(responseJson);
    }
}
```

#### TypeScript / Node.js
```typescript
class ApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.apiKey = apiKey;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      headers: { 'X-API-Key': this.apiKey }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }
}
```

### 4. Error Handling

```csharp
// C#
public async Task<ApiResult<T>> SafeGetAsync<T>(string endpoint)
{
    try
    {
        var response = await _httpClient.GetAsync($"{_baseUrl}/{endpoint}");
        
        if (!response.IsSuccessStatusCode)
        {
            return new ApiResult<T>
            {
                Success = false,
                Error = $"HTTP {(int)response.StatusCode}: {response.ReasonPhrase}"
            };
        }
        
        var json = await response.Content.ReadAsStringAsync();
        var data = JsonSerializer.Deserialize<T>(json);
        return new ApiResult<T> { Success = true, Data = data };
    }
    catch (HttpRequestException ex)
    {
        return new ApiResult<T> { Success = false, Error = ex.Message };
    }
}
```

### 5. Rate Limiting

```typescript
class RateLimitedClient {
  private requestQueue: (() => Promise<void>)[] = [];
  private processing = false;
  private requestsPerSecond: number;

  constructor(requestsPerSecond: number) {
    this.requestsPerSecond = requestsPerSecond;
  }

  async enqueue<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.requestQueue.push(async () => {
        try {
          resolve(await request());
        } catch (error) {
          reject(error);
        }
      });
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.processing) return;
    this.processing = true;

    while (this.requestQueue.length > 0) {
      const request = this.requestQueue.shift();
      if (request) {
        await request();
        await this.delay(1000 / this.requestsPerSecond);
      }
    }

    this.processing = false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### 6. Retry Logic

```csharp
// C#
public async Task<T?> GetWithRetryAsync<T>(string endpoint, int maxRetries = 3)
{
    for (int attempt = 1; attempt <= maxRetries; attempt++)
    {
        try
        {
            return await GetAsync<T>(endpoint);
        }
        catch (HttpRequestException) when (attempt < maxRetries)
        {
            await Task.Delay(TimeSpan.FromSeconds(Math.Pow(2, attempt)));
        }
    }
    throw new Exception($"Failed after {maxRetries} attempts");
}
```

## Best Practices

1. **Use HttpClientFactory** (in .NET) for proper connection management
2. **Set timeouts** to avoid hanging requests
3. **Log requests and responses** for debugging
4. **Use strongly-typed models** for request/response data
5. **Implement circuit breakers** for fault tolerance
6. **Store credentials securely** in environment variables or secret managers
7. **Validate responses** before using data
8. **Handle pagination** for list endpoints
