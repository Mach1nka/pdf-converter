import { useMemo, useContext } from 'react';
import { useFormik } from 'formik';
import { Button, TextField, Typography } from '@mui/material';

import { initialValues, LoginCredentials, validationSchema } from '../../schemas/login';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks';
import {
  AuthActions,
  AuthCredentials,
  AuthResponse,
} from '../../services/resources/models/auth.model';
import { login } from '../../services/resources/requests/auth';
import { AuthContext } from '../../contexts/Auth';

const LoginForm: React.FC = () => {
  const { dispatch } = useContext(AuthContext);
  const callback = useApi<AuthResponse, AuthCredentials>(login);
  const navigate = useNavigate();

  const { usernameId, passId }: { [k: string]: keyof LoginCredentials } = useMemo(() => {
    return {
      usernameId: 'username',
      passId: 'password',
    };
  }, []);

  const onSubmit = async (values: LoginCredentials) => {
    const { data } = await callback(values);
    dispatch({
      type: AuthActions.LOG_IN,
      payload: { username: data.username },
    });
    navigate('/home');
  };

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
          error={formik.touched[usernameId] && !!formik.errors[usernameId]}
          helperText={formik.touched[usernameId] && formik.errors[usernameId]}
          id={usernameId}
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
