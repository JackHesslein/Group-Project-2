import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const NEWS_API_URL = 'https://newsdata.io/api/1/latest';
const NEWS_API_KEY = process.env.NEWS_API_KEY!;

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  published: string;
  author: string;
}

export const getTopHeadlines = async (query: string): Promise<NewsArticle[]> => {
  try {
    const params = {
      apikey: NEWS_API_KEY,
      q: query,
      language: 'en', // Ensure only English articles are fetched
    };

    console.log('Request URL:', NEWS_API_URL);
    console.log('Request Params:', params);

    const response = await axios.get(NEWS_API_URL, { params });

    if (response.data.status !== 'success') {
      throw new Error(`Error fetching news: ${response.data.message}`);
    }

    return response.data.results;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};