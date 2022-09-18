import { useContext } from 'react';
import { LinearProgress } from '@mui/material';

import { LoaderContext } from '../../contexts/Loader';

const Loader: React.FC = () => {
  const { loading } = useContext(LoaderContext);

  return loading ? <LinearProgress sx={{ position: 'absolute', bottom: 0 }} /> : null;
};

export default Loader;
