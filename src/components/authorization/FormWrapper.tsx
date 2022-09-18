import { PropsWithChildren } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import { StylesOverride } from '../../types/types';

const useStyles = (): StylesOverride => ({
  Wrapper: {
    display: 'flex',
    height: '50vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Form: {
    padding: '1rem',
    boxSizing: 'content-box',
    width: '400px',
  },
});

const FormWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const styles = useStyles();

  return (
    <Box sx={styles.Wrapper}>
      <Box sx={styles.Form}>{children}</Box>
    </Box>
  );
};

FormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormWrapper;
