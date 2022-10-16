import { useContext } from 'react';
import { LinearProgress } from '@mui/material';

import { LoaderContext } from '../../contexts/angudiagn';

const Loader: React.FC = () => {
  const { loading } = useContext(LoaderContext);

  return loading ? (
    <LinearProgress sx={{ position: 'absolute', bottom: 0, width: '100%' }} />
  ) : null;
};

export default Loader;
