import { Typography, Box } from '@mui/material';
import { StylesOverride } from '../../types/types';

const useStyles = (): StylesOverride => ({
  Box: {
    height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Heading: {
    fontSize: {
      xs: '6rem',
      md: '10rem',
    },
  },
  SubHeading: {
    fontWeight: 600,
    fontSize: '1.5rem',
    textTransform: 'uppercase',
  },
  Description: {
    textTransform: 'uppercase',
  },
});

const NotFound: React.FC = () => {
  const styles = useStyles();

  return (
    <Box sx={styles.Box} component="div">
      <Typography gutterBottom sx={styles.Heading} variant="h3">
        Oops!
      </Typography>
      <Typography sx={styles.SubHeading}>404 - page not found</Typography>
      <Typography sx={styles.Description} align="center" paragraph>
        we are sorry, but the page you requested was not found
      </Typography>
    </Box>
  );
};

export default NotFound;
