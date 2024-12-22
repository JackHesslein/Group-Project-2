import { Router, Request, Response, NextFunction } from 'express';
import { register, login, getProfile, updateSearchHistory } from '../controllers/authController';
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
router.post('/search-history', customAuthMiddleware, updateSearchHistory);

export default router;