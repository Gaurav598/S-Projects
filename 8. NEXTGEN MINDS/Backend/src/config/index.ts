import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  mongoUri: string;
  jwtSecret: string;
  jwtExpiration: string;
  corsOrigin: string;
  openaiApiKey?: string;
  nodeEnv: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || '9999', 10),
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/nextgen-minds',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtExpiration: process.env.JWT_EXPIRATION || '7d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  openaiApiKey: process.env.OPENAI_API_KEY,
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default config;
