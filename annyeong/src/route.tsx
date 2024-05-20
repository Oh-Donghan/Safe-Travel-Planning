import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './routes/home';
import Main from './routes/plan';
import Login from './routes/login';
import CreateAccount from './routes/create-account';

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
        element: <Main />,
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