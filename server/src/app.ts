import express from 'express';
import routes from './routes';
import { sequelize } from './config/database';

const app = express();

// Middleware


// API Routes
app.use('/api', routes);

// Database connection
sequelize.sync()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

export default app;