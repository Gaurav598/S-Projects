import express, { Application } from 'express';
import cors from 'cors';
import config from './config';
import { connectDB } from './utils/mongo';
import { errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';
import dataRoutes from './routes/data';
import chatRoutes from './routes/chat';

const app: Application = express();

app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'NextGen Minds API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      profile: '/api/profile',
      data: '/api',
      chat: '/chat',
    },
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api', dataRoutes);
app.use('/chat', chatRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(config.port, () => {
      console.log(`
╔══════════════════════════════════════════════╗
║   NextGen Minds Backend API                  ║
║   Server running on port ${config.port}              ║
║   Environment: ${config.nodeEnv.padEnd(27)} ║
║   CORS enabled for: ${config.corsOrigin.padEnd(18)} ║
╚══════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
