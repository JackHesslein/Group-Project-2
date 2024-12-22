// filepath: /c:/Users/doc72/OneDrive/Documents/bootcamp/test code/project 2/server/src/server.ts
import express from 'express';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import appRoutes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Serve static files from the client's dist folder
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Routes
app.use('/api', appRoutes);

// Database connection
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Serve the client app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});