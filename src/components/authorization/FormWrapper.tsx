import { PropsWithChildren, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { useStyles } from '../../hooks';
import { AuthContext } from '../../contexts/Auth';

const FormWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();
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

  useEffect(() => {
    if (isAuth) {
      navigate('/home');
    }
  }, [isAuth]);

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
