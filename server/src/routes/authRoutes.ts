import { Router, Request, Response, NextFunction } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';
import User from '../models/user';

interface AuthenticatedRequest extends Request {
  user?: User;
}

const customAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req as AuthenticatedRequest, res, next);
};

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', customAuthMiddleware, getProfile);
router.post('/search-history', customAuthMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (!user.searchHistory) {
      user.searchHistory = []; // Initialize searchHistory if it doesn't exist
    }
    user.searchHistory.push(req.body.query);
    await user.save();
    res.status(200).json({ message: 'Search history updated' });
  } catch (error) {
    console.error('Error updating search history:', error); // Log the error
    res.status(500).json({ error: 'Failed to update search history' });
  }
});

export default router;