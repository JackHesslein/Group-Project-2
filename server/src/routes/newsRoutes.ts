import { Router } from 'express';
import { getNews } from '../controllers/newsController';

const router = Router();

router.get('/:country', getNews);

export default router;