import React from 'react';
import { Typography } from '@mui/material';

interface Props {
  error: string;
}

const ErrorProtector: React.FC<Props> = ({ error }) => (
  <>
    <Typography color="error" align="center" variant="h4">
      Error!
    </Typography>
    <Typography align="center" variant="h6">
      {error}
    </Typography>
  </>
);

export default ErrorProtector;
