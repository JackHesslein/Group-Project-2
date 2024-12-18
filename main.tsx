import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import ErrorPage from './pages/error.tsx';
import Login from './pages/login.tsx';
import Register from './pages/register.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login onLogin={function (): void {
          throw new Error('Function not implemented.');
        } } />
      },  
      {
        path: '/register',
        element: <Register />
      }, 
      {
        path: '/login',
        element: <Login onLogin={function (): void {
          throw new Error('Function not implemented.');
        } } />
      }, 
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
