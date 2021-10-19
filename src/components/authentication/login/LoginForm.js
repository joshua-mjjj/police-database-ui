/* eslint-disable camelcase */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import Alert from '@material-ui/lab/Alert';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { login } from '../../../actions/auth';

// ----------------------------------------------------------------------

function LoginForm(props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Username is required'),
    password: Yup.string().required('Password is required'),
    id: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('USER ID is required')
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      username: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      // const token = 'ihonjefvdhiodmdapiconj34567545tr9founjdckfn';
      // localStorage.setItem('token', token);
      console.log('Logging user in...');
      props.login(values.username, values.password, values.id);
      // window.location.href = '/dashboard';
    }
  });

  if (props.auth.isAuthenticated === true) {
    console.log('Authenticated: ', props.auth.isAuthenticated);
    window.location.href = '/dashboard';
  }

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  // Auth
  const handleLogin = () => {
    console.log('Logging in');
  };

  let alert;
  if (props.messages.system_message !== null) {
    const timer = setTimeout(() => {
      window.location.href = '/login';
    }, 1500);
    alert = (
      <div className="alerts">
        <Alert severity="info">{props.messages.system_message}</Alert>
      </div>
    );
  }

  if (props.errors.msg) {
    let msg;
    if (props.errors.msg.non_field_errors) {
      const timer = setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
      msg = props.errors.msg.non_field_errors;
      alert = (
        <div className="alerts">
          <Alert severity="error">{msg}</Alert>
        </div>
      );
    }
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>{alert}</Stack>
        <br />
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="id"
            type="id"
            label="USER ID"
            {...getFieldProps('id')}
            error={Boolean(touched.id && errors.id)}
            helperText={touched.id && errors.id}
          />
          <TextField
            fullWidth
            autoComplete="username"
            type="username"
            label="Username"
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          onClick={handleLogin}
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { login })(LoginForm);
