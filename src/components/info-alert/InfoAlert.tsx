import PropTypes from 'prop-types';
import { AlertTitle, Alert } from '@mui/material';

import { AlertSeverity } from '../../services/resources/models/alert.model';

type Props = {
  id: string;
  message: string;
  severity: AlertSeverity;
  onClose: (id: string) => void;
};

const InfoAlert: React.FC<Props> = ({ id, message, severity, onClose }) => {
  return (
    <Alert onClose={() => onClose(id)} variant="outlined" severity={severity}>
      <AlertTitle sx={{ textTransform: 'capitalize' }}>{severity}</AlertTitle>
      {message}
    </Alert>
  );
};

InfoAlert.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(Object.values(AlertSeverity)).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InfoAlert;
