import { Outlet } from 'react-router-dom';
import { Container } from '@mui/system';

import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Container disableGutters sx={{ marginTop: '3.5rem' }} maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
