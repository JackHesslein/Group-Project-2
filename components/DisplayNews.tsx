import React, { useState, useEffect } from 'react';
import './DisplayNews.css'; // Assuming you have a CSS file for styling

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: { name: string };
}

const DisplayNews: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [error, setError] = useState<string>('');

  const API_KEY = '0463d5c52fmsh09e344571bdfb85p1523c2jsnf44c5c7d725d'; // News API key
  const NEWS_API_URL = https://today-in-history.p.rapidapi.com/thisday


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(NEWS_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data.articles);
        setError('');
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="display-news">
      <h2>Latest Weather-Related News</h2>
      {error && <p className="error-message">{error}</p>}
      {news.length > 0 ? (
        <ul className="news-list">
          {news.map((article, index) => (
            <li key={index} className="news-item">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <p className="source">Source: {article.source.name}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>Loading news...</p>
      )}
    </div>
  );
};

export default DisplayNews;
