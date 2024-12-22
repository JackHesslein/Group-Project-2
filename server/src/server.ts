import express from 'express';
import { sequelize } from './config/database';
import dotenv from 'dotenv';
import path from 'path';
import appRoutes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());

// Serve static files from the client's dist folder
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Routes
app.use('/api', appRoutes);

// Database connection and synchronization
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    await sequelize.sync(); // Ensure models are synchronized with the database
    console.log('Database synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
};

startServer();