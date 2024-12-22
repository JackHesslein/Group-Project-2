import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({ username, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error); // Log the error
    if ((error as any).name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Username already exists' });
    } else {
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log(`Login attempt for username: ${username}`); // Log the username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log('User not found'); // Log if user is not found
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('Invalid password'); // Log if password is invalid
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update search history
    const searchHistory = req.body.searchHistory || [];
    if (!Array.isArray(searchHistory)) {
      return res.status(400).json({ error: 'searchHistory must be an array' });
    }
    user.searchHistory = searchHistory;
    await user.save();

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error); // Log the error
    res.status(500).json({ error: 'Failed to log in' });
  }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching profile:', error); // Log the error
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateSearchHistory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { searchHistory } = req.body;

    if (!Array.isArray(searchHistory)) {
      return res.status(400).json({ error: 'searchHistory must be an array' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.searchHistory = searchHistory;
    await user.save();

    res.status(200).json({ message: 'Search history updated successfully' });
  } catch (error) {
    console.error('Error updating search history:', error); // Log the error
    res.status(500).json({ error: 'Failed to update search history' });
  }
};