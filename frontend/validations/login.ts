import * as yup from 'yup';

export const loginValidation = yup.object().shape({
  email: yup.string().email("Please Enter a valid email").required('Email is Required'),
  password: yup.string().required('Password is Required'),
});
