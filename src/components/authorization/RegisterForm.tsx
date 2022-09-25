import { useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, TextField, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';

import { initialValues, RegisterCredentials, validationSchema } from '../../schemas/registration';
import { useApi } from '../../hooks';
import { register } from '../../services/resources/requests/auth';
import { AuthCredentials } from '../../services/resources/models/auth.model';
import { AlertContext } from '../../contexts/Alert';
import { AlertActions, AlertSeverity } from '../../services/resources/models/alert.model';

const RegisterForm: React.FC = () => {
  const { dispatch } = useContext(AlertContext);
  const callback = useApi<string, AuthCredentials>(register);
  const navigate = useNavigate();

  const { usernameId, passId, passCopyId }: { [k: string]: keyof RegisterCredentials } =
    useMemo(() => {
      return {
        usernameId: 'username',
        passId: 'password',
        passCopyId: 'passwordCopy',
      };
    }, []);

  const onSubmit = ({ username, password }: RegisterCredentials) => {
    callback({ username, password }).then(({ data }) => {
      dispatch({
        type: AlertActions.ADD,
        payload: {
          id: uuid(),
          severity: AlertSeverity.Success,
          message: data,
        },
      });
      navigate('/login');
    });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <>
      <Typography gutterBottom variant="h3">
        Sign Up
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
        <TextField
          type="password"
          color="info"
          onChange={formik.handleChange}
          error={formik.touched[passCopyId] && !!formik.errors[passCopyId]}
          helperText={formik.touched[passCopyId] && formik.errors[passCopyId]}
          id={passCopyId}
          label="Password confirmation"
          placeholder="Password confirmation"
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

export default RegisterForm;
