import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';

import AddEmployee from './pages/Database_Ops/AddEmployee';

// ----------------------------------------------------------------------

const routes = (isAuthenticated) => [
  {
    path: '/dashboard',
    element:
      localStorage.getItem('token') === null || localStorage.getItem('token') === undefined ? (
        <Navigate to="/login" />
      ) : (
        <DashboardLayout />
      ),
    children: [
      { element: <Navigate to="/dashboard/employee_add" replace /> },
      { path: 'employee_add', element: <AddEmployee /> },
      // { path: 'app', element: <DashboardApp /> },
      { path: 'employees', element: <User /> },
      { path: 'profile', element: <Profile /> },
      { path: 'blog', element: <Blog /> }
    ]
  },
  {
    path: '/',
    children: [
      { path: 'login', element: <Login /> },
      // { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
  // { path: '*', element: <Navigate to="/404" replace /> }
];

export default routes;
