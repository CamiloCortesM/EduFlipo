import { Navigate, createBrowserRouter } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import { Students } from '../pages/Students';
import { Teachers } from '../pages/Teachers';
import { Classes } from '../pages/Classes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Render the Layout component for all routes
    children: [
      {
        // Students route
        path: '/students',
        element: <Students />,
      },
      {
        // Teachers route
        path: '/teachers',
        element: <Teachers />,
      },
      {
        // Classes route
        path: '/classes',
        element: <Classes />,
      },
      {
        // Catch-all route, redirect to Students
        path: '*',
        element: <Navigate to="/students" replace />,
      },
    ],
  },
]);
