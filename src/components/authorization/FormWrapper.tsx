import { PropsWithChildren } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import { useStyles } from '../../hooks';

const FormWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const styles = useStyles(
    {
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
    },
    [],
  );

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
