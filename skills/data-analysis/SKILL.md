---
name: data-analysis
description: Data analysis workflows and patterns for exploring, transforming, and visualizing data. Use when working with data, creating reports, or when users mention "data analysis", "analyze data", "data exploration", or "reporting".
license: MIT
metadata:
  author: IHKREDDY
  version: "1.0"
  category: data
compatibility: Works with any programming language or framework
---

# Data Analysis Skill

## When to Use This Skill

Use this skill when:
- Exploring and analyzing datasets
- Creating data reports
- Transforming or cleaning data
- Building visualizations
- Users mention "data analysis", "analyze data", or "reporting"

## Data Analysis Process

### 1. Data Understanding

Before analysis, understand your data:
- What is the source?
- What does each field represent?
- What is the data quality?
- What are the business questions to answer?

### 2. Data Loading

#### C# / .NET
```csharp
// Using CsvHelper
using var reader = new StreamReader("data.csv");
using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
var records = csv.GetRecords<DataRecord>().ToList();
```

#### TypeScript
```typescript
import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';

const data = parse(readFileSync('data.csv'), {
  columns: true,
  skip_empty_lines: true
});
```

### 3. Data Exploration

Key questions to answer:
- How many records?
- What are the column types?
- Are there missing values?
- What are the value distributions?
- Are there outliers?

```csharp
// C# - Basic exploration
Console.WriteLine($"Total records: {data.Count}");
Console.WriteLine($"Columns: {string.Join(", ", data.First().GetType().GetProperties().Select(p => p.Name))}");
Console.WriteLine($"Missing values: {data.Count(r => r.SomeField == null)}");
```

### 4. Data Cleaning

Common cleaning tasks:
- Handle missing values
- Remove duplicates
- Fix data types
- Standardize formats
- Handle outliers

```csharp
// C# - Cleaning examples
var cleaned = data
    .Where(r => r.Date != null)  // Remove nulls
    .DistinctBy(r => r.Id)       // Remove duplicates
    .Select(r => new {
        r.Id,
        Date = DateTime.Parse(r.DateString),
        Amount = decimal.Parse(r.AmountString)
    })
    .ToList();
```

### 5. Data Transformation

#### Aggregation
```csharp
// C# - Group and aggregate
var summary = data
    .GroupBy(r => r.Category)
    .Select(g => new {
        Category = g.Key,
        Count = g.Count(),
        TotalAmount = g.Sum(r => r.Amount),
        AvgAmount = g.Average(r => r.Amount)
    })
    .OrderByDescending(x => x.TotalAmount);
```

#### Pivoting
```csharp
// C# - Pivot data
var pivot = data
    .GroupBy(r => new { r.Year, r.Month })
    .ToDictionary(
        g => $"{g.Key.Year}-{g.Key.Month:D2}",
        g => g.Sum(r => r.Amount)
    );
```

### 6. Statistical Analysis

Common metrics:
- **Mean**: Average value
- **Median**: Middle value
- **Mode**: Most frequent value
- **Std Dev**: Spread of values
- **Percentiles**: Distribution points

```csharp
// C# - Basic statistics
var values = data.Select(r => r.Amount).OrderBy(x => x).ToList();
var mean = values.Average();
var median = values[values.Count / 2];
var stdDev = Math.Sqrt(values.Average(x => Math.Pow(x - mean, 2)));
```

### 7. Reporting

#### Console Output
```csharp
Console.WriteLine("=== Sales Report ===");
Console.WriteLine($"Total Sales: {total:C}");
Console.WriteLine($"Average Order: {average:C}");
Console.WriteLine("\nTop Categories:");
foreach (var cat in topCategories.Take(5))
{
    Console.WriteLine($"  {cat.Name}: {cat.Amount:C}");
}
```

#### Export to CSV
```csharp
using var writer = new StreamWriter("report.csv");
using var csv = new CsvWriter(writer, CultureInfo.InvariantCulture);
csv.WriteRecords(reportData);
```

## Best Practices

1. **Document assumptions** about the data
2. **Validate data quality** before analysis
3. **Use appropriate data types** for accuracy
4. **Handle edge cases** (nulls, zeros, negative values)
5. **Version control** analysis scripts
6. **Create reproducible** workflows
7. **Visualize distributions** to understand data
8. **Test calculations** with known values
