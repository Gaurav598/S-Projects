# Data Directory

Place your JSON data files here to seed the database.

## Required Files

- `careers.json` - Career opportunities data
- `scholarships.json` - Scholarship information
- `colleges.json` - College/university data

## Running the Seed

After placing your JSON files in this directory, run:

```bash
npm run seed
```

## Expected JSON Formats

### careers.json
```json
[
  {
    "id": "software-engineer",
    "title": "Software Engineer",
    "description": "Design and develop software applications",
    "requirements": ["Bachelor's in CS", "Programming skills"],
    "skills": ["JavaScript", "Python", "React"],
    "salary": {
      "min": 70000,
      "max": 150000
    },
    "growth": "High growth potential",
    "roadmap": ["Learn programming", "Build projects", "Get internship"]
  }
]
```

### scholarships.json
```json
[
  {
    "title": "STEM Excellence Scholarship",
    "description": "For outstanding STEM students",
    "amount": 5000,
    "eligibility": "GPA 3.5+, STEM major",
    "deadline": "2024-12-31"
  }
]
```

### colleges.json
```json
[
  {
    "name": "University of Technology",
    "location": "California, USA",
    "programs": ["Computer Science", "Engineering"],
    "admissionRequirements": ["SAT 1200+", "GPA 3.0+"]
  }
]
```
