import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { parse } from 'pg-connection-string';

dotenv.config();

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const config = parse(DATABASE_URL);

const sequelize = new Sequelize(
  config.database!,
  config.user!,
  config.password!,
  {
    host: config.host || 'localhost',
    port: Number(config.port),
    dialect: 'postgres',
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected');
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    process.exit(1);
  }
};

export { sequelize, connectDB };