import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    console.log('No token provided'); // Log if no token is provided
    res.status(401).send('Access denied');
    return;
  }

  try {
    console.log(`Token received: ${token}`); // Log the token received
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number, username: string };
    console.log(`Decoded token: ${JSON.stringify(decoded)}`); // Log the decoded token
    req.user = { id: decoded.userId, username: decoded.username } as User;
    next();
  } catch (error) {
    console.error('Invalid token:', error); // Log the error
    res.status(401).send('Invalid token');
  }
};