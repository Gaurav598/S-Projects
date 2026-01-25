# NextGen Minds Data Schema

This folder contains JSON data files that power the NextGen Minds application. Each file follows a specific schema designed to provide comprehensive information for career guidance.

## Files Overview

### careers.json
Contains detailed information about various career paths including:
- Career descriptions and requirements
- Salary ranges and growth projections
- Required skills and education levels
- Industry categorization
- Tags for searchability

### chatbot_faq.json
FAQ data for the AI chatbot including:
- Common questions and answers
- Keyword matching for intelligent responses
- Categorized topics for better organization
- Context-aware response generation

### scholarships.json
Scholarship and financial aid information including:
- Eligibility requirements and deadlines
- Application requirements and processes
- Target career field associations
- Provider information and contact details

### colleges.json
Educational institution data including:
- Program offerings and specializations
- Admission requirements and tuition costs
- Rankings and institutional features
- Location and size information

## Schema Details

### Career Schema
```json
{
  "id": "unique-identifier",
  "title": "Career Title",
  "description": "Detailed description",
  "category": "Primary category",
  "requirements": ["List of requirements"],
  "skills": ["Required skills"],
  "salary": {
    "min": number,
    "max": number,
    "currency": "USD"
  },
  "growth": "Growth description",
  "industry": "Industry classification",
  "workEnvironment": "Work setting",
  "educationLevel": "Required education",
  "experienceRequired": "Experience level",
  "tags": ["searchable", "tags"]
}
```

### FAQ Schema
```json
{
  "id": "unique-identifier",
  "question": "Question text",
  "answer": "Detailed answer",
  "category": "Topic category",
  "keywords": ["matching", "keywords"]
}
```

### Scholarship Schema
```json
{
  "id": "unique-identifier",
  "title": "Scholarship Name",
  "description": "Description",
  "amount": {
    "min": number,
    "max": number,
    "currency": "USD"
  },
  "eligibility": ["Requirements"],
  "deadline": "YYYY-MM-DD",
  "renewable": boolean,
  "provider": "Organization name",
  "applicationRequirements": ["Requirements"],
  "website": "URL",
  "categories": ["Categories"],
  "targetCareers": ["career-ids"]
}
```

### College Schema
```json
{
  "id": "unique-identifier",
  "name": "Institution Name",
  "location": {
    "city": "City",
    "state": "State",
    "country": "Country"
  },
  "type": "Public/Private",
  "size": "Size description",
  "established": year,
  "website": "URL",
  "programs": [
    {
      "degree": "Degree type",
      "major": "Major name",
      "duration": "Duration",
      "credits": number,
      "specializations": ["Specializations"]
    }
  ],
  "admissionRequirements": {
    "gpa": number,
    "testScores": ["Score requirements"],
    "requirements": ["Other requirements"]
  },
  "tuition": {
    "amount": number,
    "currency": "USD"
  },
  "financialAid": {
    "available": boolean,
    "scholarships": ["Types"],
    "averageAid": number
  },
  "rankings": {
    "overall": number,
    "category": number
  },
  "targetCareers": ["career-ids"],
  "features": ["Institution features"]
}
```

## Usage Notes

- All monetary amounts are in USD unless specified otherwise
- Dates follow ISO 8601 format (YYYY-MM-DD)
- Career IDs should match between files for proper linking
- Keywords in FAQ should be lowercase for better matching
- Rankings are percentile-based (higher is better)

## Expanding the Data

To add new careers, scholarships, or institutions:

1. Follow the existing schema structure
2. Ensure unique IDs across all entries
3. Maintain consistency in categorization
4. Include comprehensive keyword coverage for search functionality
5. Validate JSON structure before deployment

## Integration Points

The data files integrate with:
- Career recommendation algorithm
- Chatbot response system
- Scholarship matching engine
- College search and filter functionality
- Export/import data features

For technical implementation details, refer to the main application documentation.