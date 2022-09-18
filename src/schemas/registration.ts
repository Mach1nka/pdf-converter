import * as yup from 'yup';

export type RegisterCredentials = {
  login: string;
  password: string;
  passwordCopy: string;
};

const initialValues: RegisterCredentials = {
  login: '',
  password: '',
  passwordCopy: '',
};

const validationSchema = yup.object({
  login: yup
    .string()
    .strict()
    .trim('Login cannot include leading and trailing spaces')
    .min(5, 'Login must be more than 5 symbols')
    .required('Login is required')
    .matches(/^[a-zA-Z0-9]/, 'Login must have numbers and letters'),
  password: yup
    .string()
    .strict()
    .trim('Login cannot include leading and trailing spaces')
    .required('Password is required')
    .min(6, 'Login must be more than 6 symbols')
    .matches(/^[a-zA-Z0-9]/, 'Password must have only numbers and letters'),
  passwordCopy: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
});

export { initialValues, validationSchema };
