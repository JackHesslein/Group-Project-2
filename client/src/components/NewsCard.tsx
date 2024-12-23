import React, { useEffect, useState } from 'react';
import { fetchNews } from '../utils/api';
import '../styles/Newscard.css';

interface NewsCardProps {
  searchInput: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ searchInput }) => {
  const [newsArticles, setNewsArticles] = useState<any[]>([]);

  useEffect(() => {
    if (searchInput) {
      const handleSearch = async () => {
        try {
          const response = await fetchNews(searchInput);
          setNewsArticles(response.data.slice(0, 1)); // Display only one article
        } catch (error) {
          console.error('Error fetching news:', error);
        }
      };
      handleSearch();
    }
  }, [searchInput]);

  return (
    <div>
      <h2>News Articles</h2>
      <div>
        {newsArticles.map((article, index) => (
          <div key={index}>
            <h3>{article.title}</h3>
            {article.image_url && <img src={article.image_url} alt={article.title} />}
            <p>{article.description}</p>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCard;