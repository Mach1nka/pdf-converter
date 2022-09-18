import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Typography, useTheme, Toolbar, useMediaQuery, Link, Theme } from '@mui/material';

import { StylesOverride } from '../../types/types';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import Loader from './loader';

const useStyles = (theme: Theme): StylesOverride => ({
  AppBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    boxShadow: 'unset',
  },
  Link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  Toolbar: {
    width: 'inherit',
    padding: '1rem',
  },
  Heading: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
      textAlign: 'center',
    },
  },
});

const Header: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar sx={styles.AppBar} position="sticky">
      <Toolbar sx={styles.Toolbar}>
        <Typography align="left" variant="h1" sx={styles.Heading}>
          <Link component={RouterLink} sx={styles.Link} to="/">
            PDFConvertor
          </Link>
        </Typography>
        {smScreen ? <MobileNav /> : <DesktopNav />}
      </Toolbar>
      <Loader />
    </AppBar>
  );
};

export default Header;
