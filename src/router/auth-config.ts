import { v4 as uuid } from 'uuid';

export type AuthRoute = {
  id: string;
  title: string;
  path: string;
};

const authRoutes: AuthRoute[] = [
  {
    id: uuid(),
    title: 'Login',
    path: '/login',
  },
  {
    id: uuid(),
    title: 'Sign Up',
    path: '/register',
  },
];

export { authRoutes };
