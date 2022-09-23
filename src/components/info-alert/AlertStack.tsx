import { useContext, useCallback } from 'react';
import { Stack } from '@mui/material';

import { AlertContext } from '../../contexts/Alert';
import { useStyles } from '../../hooks';
import InfoAlert from './InfoAlert';
import { AlertActions, AlertData } from '../../services/resources/models/alert.model';

const AlertStack: React.FC = () => {
  const { alerts, dispatch } = useContext(AlertContext);

  const styles = useStyles(
    {
      Stack: {
        position: 'fixed',
        bottom: '40px',
        right: '20px',
        width: '300px',
      },
    },
    [],
  );

  const onClose = useCallback((id: string) => {
    dispatch({ type: AlertActions.REMOVE, payload: id });
  }, []);

  return (
    <Stack sx={styles.Stack} spacing={1}>
      {alerts.map((el: AlertData) => (
        <InfoAlert key={el.id} {...el} onClose={onClose} />
      ))}
    </Stack>
  );
};

export default AlertStack;
