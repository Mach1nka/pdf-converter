import { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/system';

import Header from './Header';
import AlertStack from '../info-alert/AlertStack';
import { AuthContext } from '../../contexts/Auth';
import { authManagement } from '../../services/resources/storages/client';
import { AuthKeys } from '../../services/resources/storages/types';
import { refreshToken } from '../../services/resources/requests/auth';
import { AuthActions } from '../../services/resources/models/auth.model';

const Layout: React.FC = () => {
  const { dispatch, isAuth } = useContext(AuthContext);

  useEffect(() => {
    const refreshSession = async () => {
      const token = authManagement.get(AuthKeys.REFRESH_TOKEN);
      const username = authManagement.get(AuthKeys.USERNAME);
      if (token && !isAuth) {
        const { data } = await refreshToken({
          refreshToken: String(token),
          username: String(username),
        });

        dispatch({
          type: AuthActions.LOG_IN,
          payload: { username: data.username },
        });
      }
    };
    refreshSession();
  }, []);

  return (
    <>
      <Header />
      <AlertStack />
      <Container disableGutters sx={{ marginTop: '3.5rem' }} maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
