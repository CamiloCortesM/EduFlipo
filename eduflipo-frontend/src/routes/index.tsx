import { Navigate, createBrowserRouter } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import { Students } from '../pages/Students';
import { Teachers } from '../pages/Teachers';
import { Classes } from '../pages/Classes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/students',
        element: <Students />,
      },
      {
        path: '/teachers',
        element: <Teachers />,
      },
      {
        path: '/classes',
        element: <Classes />,
      },
      {
        path: '*',
        element: <Navigate to="/students" replace />,
      },
    ],
  },
]);
