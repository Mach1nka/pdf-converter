import { Outlet } from 'react-router-dom';
import { Container } from '@mui/system';

import Header from './Header';
import AlertStack from '../info-alert/AlertStack';

const Layout = () => {
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
