import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './routes/home';
import CreateAccount from './routes/create-account';
import Login from './routes/login';
import Plan from './routes/plan';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/country/:id',
        element: <Plan />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/create-account',
        element: <CreateAccount />,
      },
    ],
  },
]);