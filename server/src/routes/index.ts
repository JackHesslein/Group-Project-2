import { Router } from 'express';
import weatherRoutes from './weatherRoutes';
import newsRoutes from './newsRoutes';
import authRoutes from './authRoutes';

const router = Router();

router.use('/weather', weatherRoutes);
router.use('/news', newsRoutes);
router.use('/auth', authRoutes);

export default router;