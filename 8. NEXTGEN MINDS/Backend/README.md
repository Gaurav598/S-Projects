# NextGen Minds Backend API

Production-ready Node.js + Express + TypeScript + MongoDB backend for the NextGen Minds career guidance platform.

## Features

- **Authentication**: JWT-based signup/login with bcrypt password hashing
- **User Profiles**: Full CRUD operations for user profile management
- **Career Data**: Query careers by skills and interests
- **Scholarships & Colleges**: Comprehensive educational resources
- **AI Chatbot**: OpenAI integration for career guidance conversations
- **Security**: Protected routes with JWT middleware, input validation
- **TypeScript**: Full type safety across the entire codebase

## Tech Stack

- Node.js 18+
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- OpenAI API for chatbot functionality
- CORS enabled

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB instance running (local or cloud)
- OpenAI API key (optional, for chat functionality)

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=9999
MONGO_URI=mongodb://localhost:27017/nextgen-minds
JWT_SECRET=your-secret-key-here
OPENAI_API_KEY=your-openai-api-key
CORS_ORIGIN=http://localhost:5173
```

3. (Optional) Seed the database:

Place your JSON files (`careers.json`, `scholarships.json`, `colleges.json`) in the `data/` directory, then run:

```bash
npm run seed
```

### Running the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm run build
npm start
```

The server will start on `http://localhost:9999`

## API Endpoints

### Authentication

#### Signup
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "profile": {
    "age": 22,
    "education": "Bachelor's",
    "interests": ["technology", "design"],
    "skills": ["JavaScript", "React"],
    "goals": ["become a software engineer"]
  }
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

Returns JWT token for authenticated requests.

### Profile (Protected Routes)

#### Get Profile
```bash
GET /api/profile
Authorization: Bearer <jwt-token>
```

#### Update Profile
```bash
PUT /api/profile
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "John Doe",
  "age": 23,
  "skills": ["JavaScript", "React", "Node.js"],
  "interests": ["AI", "Web Development"],
  "goals": ["Get a senior developer role"]
}
```

### Career Data

#### Get All Careers
```bash
GET /api/careers

# Filter by skills
GET /api/careers?skills=javascript,react

# Filter by interests
GET /api/careers?interests=technology
```

#### Get Career by ID
```bash
GET /api/careers/:id
```

#### Get Scholarships
```bash
GET /api/scholarships
```

#### Get Colleges
```bash
GET /api/colleges

# Filter by location
GET /api/colleges?location=California

# Filter by program
GET /api/colleges?program=Computer%20Science
```

### Chat (AI Integration)

#### Send Chat Message
```bash
POST /chat
Content-Type: application/json

{
  "model_name": "gpt-3.5-turbo",
  "model_provider": "openai",
  "system_prompt": "You are a career guidance counselor",
  "messages": [
    {
      "role": "user",
      "content": "What skills do I need to become a software engineer?"
    }
  ],
  "allow_search": false
}
```

## Project Structure

```
project/
├── src/
│   ├── config/
│   │   └── index.ts              # Environment configuration
│   ├── controllers/
│   │   ├── authController.ts     # Signup/login logic
│   │   ├── profileController.ts  # Profile CRUD
│   │   ├── dataController.ts     # Career/scholarship/college queries
│   │   └── chatController.ts     # AI chat integration
│   ├── middleware/
│   │   ├── authMiddleware.ts     # JWT verification
│   │   └── errorHandler.ts       # Global error handling
│   ├── models/
│   │   ├── User.ts               # User & profile schema
│   │   ├── Career.ts             # Career schema
│   │   ├── Scholarship.ts        # Scholarship schema
│   │   └── College.ts            # College schema
│   ├── routes/
│   │   ├── auth.ts               # Auth routes
│   │   ├── profile.ts            # Profile routes
│   │   ├── data.ts               # Data routes
│   │   └── chat.ts               # Chat routes
│   ├── seed/
│   │   └── seed.ts               # Database seeding script
│   ├── types/
│   │   └── express-custom.d.ts   # Custom TypeScript definitions
│   ├── utils/
│   │   ├── mongo.ts              # MongoDB connection
│   │   └── llmClient.ts          # OpenAI wrapper
│   └── server.ts                 # Application entry point
├── data/                          # JSON files for seeding
├── .env.example                   # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

## Example Usage with curl

### Complete Flow Example

1. **Signup**:
```bash
curl -X POST http://localhost:9999/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "mypassword123"
  }'
```

2. **Login** (save the token):
```bash
curl -X POST http://localhost:9999/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "mypassword123"
  }'
```

3. **Get Profile** (use token from login):
```bash
curl -X GET http://localhost:9999/api/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

4. **Update Profile**:
```bash
curl -X PUT http://localhost:9999/api/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "skills": ["Python", "Data Science"],
    "interests": ["AI", "Machine Learning"],
    "goals": ["Become a data scientist"]
  }'
```

5. **Query Careers**:
```bash
curl -X GET "http://localhost:9999/api/careers?skills=javascript,react"
```

6. **Chat with AI**:
```bash
curl -X POST http://localhost:9999/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "What career paths are available for someone interested in AI?"
      }
    ]
  }'
```

## Database Models

### User Profile
```typescript
{
  name: string;
  age?: number;
  education?: string;
  interests: string[];
  skills: string[];
  experience?: string;
  goals: string[];
  location?: string;
}
```

### Career
```typescript
{
  id: string;
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  salary: { min: number; max: number };
  growth: string;
  roadmap: string[];
}
```

### Scholarship
```typescript
{
  title: string;
  description: string;
  amount: number;
  eligibility: string;
  deadline: Date;
}
```

### College
```typescript
{
  name: string;
  location: string;
  programs: string[];
  admissionRequirements: string[];
}
```

## Security Features

- Password hashing with bcryptjs (10 rounds)
- JWT-based authentication with configurable expiration
- Protected routes with middleware
- Input validation on all endpoints
- CORS configuration for frontend origin
- Environment-based configuration

## Development

The project uses TypeScript with strict mode enabled. All code is fully typed.

**Available scripts**:
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production server
- `npm run seed` - Seed database from JSON files

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 9999 |
| `MONGO_URI` | MongoDB connection string | mongodb://localhost:27017/nextgen-minds |
| `JWT_SECRET` | Secret key for JWT signing | (required) |
| `JWT_EXPIRATION` | JWT token expiration | 7d |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:5173 |
| `OPENAI_API_KEY` | OpenAI API key (optional) | - |

## Notes

- The `/chat` endpoint returns a 501 error if `OPENAI_API_KEY` is not configured
- The `allow_search` parameter in chat requests is supported but web search integration is not yet implemented
- All timestamps are automatically managed by MongoDB
- The seed script will clear existing data before inserting new data

## License

ISC
