import { createTheme, Theme } from '@mui/material';

const defaultTheme: Theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflow: 'hidden',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#CAEBF2',
    },
    secondary: {
      main: '#ff3b3f',
    },
    background: {
      default: '#EFEFEF',
    },
    text: {
      primary: '#252525',
    },
  },
  typography: {
    button: {
      fontWeight: 600,
    },
    fontFamily: 'Open Sans, serif',
    h4: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h3: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h5: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h6: {
      fontWeight: 700,
      fontSize: '3rem',
    },
  },
});

export default defaultTheme;
