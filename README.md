# Weather and News Dashboard

## Description

Weather and News Dashboard is a web application that provides users with current weather information and the latest news articles based on their search input. The application features user authentication, allowing users to register, log in, and view their profile.

## Features

- User Authentication (Register, Login, Logout)
- Fetch and display current weather data and forecasts
- Fetch and display the latest news articles
- Responsive design

## Tech Stack

### Frontend

- React
- TypeScript
- React Router
- Axios
- Vite

### Backend

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- JWT for authentication



## Installation

1. Clone the repository:

2. Install dependencies for both client and server:

```sh
npm run install
```

3. Set up environment variables:

Create a 

.env

 file in the root directory and add the following:

 ```
 WEATHER_API_URL=https://api.openweathermap.org/
WEATHER_API_KEY=your_weather_api_key
JWT_SECRET=your_jwt_secret
NEWS_API_URL=https://newsdata.io/api/1/latest
NEWS_API_KEY=your_news_api_key
DATABASE_URL=
 ```

4. Run the application:

```sh
npm run dev
```

## Usage

- Open your browser and navigate to `http://localhost:3000`
- Register a new account or log in with an existing account
- Use the search bar on the home page to fetch weather and news information

## API Endpoints

### Weather

- `GET /api/weather/:city` - Fetch weather data for a specific city

### News

- `GET /api/news/:country` - Fetch news articles for a specific country

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user
- `GET /api/auth/profile` - Get the profile of the logged-in user

## License

This project is licensed under the MIT License.
