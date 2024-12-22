import { Request, Response } from 'express';
import { getTopHeadlines } from '../services/newsService';

export const getNews = async (req: Request, res: Response) => {
  try {
    const { country } = req.params;
    const newsArticles = await getTopHeadlines(country);
    res.json(newsArticles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news' });
  }
};