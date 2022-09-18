import { useCallback, useMemo } from 'react';
import { useFormik } from 'formik';
import { Button, TextField, Typography } from '@mui/material';

import { initialValues, LoginCredentials, validationSchema } from '../../schemas/login';

const LoginForm: React.FC = () => {
  const onSubmit = useCallback((values: LoginCredentials) => {
    console.log(values);
  }, []);

  const { loginId, passId }: { [k: string]: keyof LoginCredentials } = useMemo(() => {
    return {
      loginId: 'login',
      passId: 'password',
    };
  }, []);

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <>
      <Typography gutterBottom variant="h3">
        Log In
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          color="info"
          onChange={formik.handleChange}
          error={formik.touched[loginId] && !!formik.errors[loginId]}
          helperText={formik.touched[loginId] && formik.errors[loginId]}
          id={loginId}
          label="Username"
          placeholder="Username"
          variant="filled"
          fullWidth
          margin="normal"
        />
        <TextField
          type="password"
          color="info"
          onChange={formik.handleChange}
          error={formik.touched[passId] && !!formik.errors[passId]}
          helperText={formik.touched[passId] && formik.errors[passId]}
          id={passId}
          label="Password"
          placeholder="Password"
          variant="filled"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" type="submit">
          Log In
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
