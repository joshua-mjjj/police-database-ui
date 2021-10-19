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
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@mui/material/Box';

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

import { change_password } from '../../../actions/auth';
import { clearMessages } from '../../../actions/messages';
import { clearErrors } from '../../../actions/errors';

// ----------------------------------------------------------------------

function ChangePassword(props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    oldpassword: Yup.string().required('Old password is required'),
    newpassword: Yup.string()
      .required('New password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
      ),
    id: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('USER ID is required')
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      oldpassword: '',
      newpassword: ''
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      console.log('changin user password...');
      // console.log(values.id);
      // console.log(values.oldpassword);
      // console.log(values.newpassword);
      props.change_password(values.oldpassword, values.newpassword, values.id);
      // window.location.href = '/dashboard';
    }
  });

  // if (props.auth.isAuthenticated === true) {
  //   console.log('Authenticated: ', props.auth.isAuthenticated);
  //   window.location.href = '/dashboard';
  // }

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  // Auth
  const handleLogin = () => {
    console.log('Logging in');
  };

  const [open, setOpen] = React.useState(true);
  const [open_messeages, setOpen_messages] = React.useState(true);

  let alert;
  if (props.messages.system_message !== null) {
    const type = props.messages.message_type;
    const page = props.messages.message_page;
    console.log(type);
    if (type === 'error' && page === 'change_password') {
      alert = (
        <Stack
          spacing={3}
          sx={{
            width: 800
          }}
        >
          <Collapse in={open_messeages}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    // setOpen_messages(false);
                    props.clearMessages();
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <div>{props.messages.system_message}</div>
            </Alert>
          </Collapse>
        </Stack>
      );
    } else if (type === 'info' && page === 'change_password') {
      alert = (
        <Stack
          spacing={3}
          sx={{
            width: 800
          }}
        >
          <Collapse in={open_messeages}>
            <Alert
              severity="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    // setOpen_messages(false);
                    props.clearMessages();
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <div>{props.messages.system_message}</div>
            </Alert>
          </Collapse>
        </Stack>
      );
    } else if (type === 'success' && page === 'change_password') {
      alert = (
        <Stack
          spacing={3}
          sx={{
            width: 800
          }}
        >
          <Collapse in={open_messeages}>
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    // setOpen_messages(false);
                    props.clearMessages();
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <div>{props.messages.system_message}</div>
            </Alert>
          </Collapse>
        </Stack>
      );
    }
  }

  if (props.errors.msg !== null && props.errors.message_page === 'change_password') {
    if (props.errors.msg.old_password[0] === 'Wrong password.') {
      console.log(props.errors.msg.old_password);
      alert = (
        <Stack
          spacing={3}
          sx={{
            width: 800
          }}
        >
          <Collapse in={open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    // setOpen(false);
                    props.clearErrors();
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <div>
                The old password you entered is wrong, please provide a correct old password inorder
                to change your password.
              </div>
            </Alert>
          </Collapse>
        </Stack>
      );
    }
  }

  // if (props.errors.msg) {
  //   let msg;
  //   if (props.errors.msg.non_field_errors) {
  //     const timer = setTimeout(() => {
  //       window.location.href = '/login';
  //     }, 1500);
  //     msg = props.errors.msg.non_field_errors;
  //     alert = (
  //       <div className="alerts">
  //         <Alert severity="error">{msg}</Alert>
  //       </div>
  //     );
  //   }
  // }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>{alert}</Stack>
        <br />
        <Stack
          spacing={3}
          sx={{
            width: 800
          }}
        >
          <TextField
            autoComplete="id"
            type="id"
            label="USER ID"
            {...getFieldProps('id')}
            error={Boolean(touched.id && errors.id)}
            helperText={touched.id && errors.id}
          />
          <TextField
            fullWidth
            autoComplete="oldpassword"
            type="oldpassword"
            label="Old password"
            {...getFieldProps('oldpassword')}
            error={Boolean(touched.oldpassword && errors.oldpassword)}
            helperText={touched.oldpassword && errors.oldpassword}
          />

          <TextField
            fullWidth
            autoComplete="newpassword"
            type={showPassword ? 'text' : 'password'}
            label="New password"
            {...getFieldProps('newpassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.newpassword && errors.newpassword)}
            helperText={touched.newpassword && errors.newpassword}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          {/* <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link> */}
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          onClick={handleLogin}
          variant="contained"
          // loading={isSubmitting}
          sx={{
            width: 800
          }}
        >
          Change password
          {props.auth.looading_change_password === true ? (
            <Box component="img" src="/static/loading.gif" sx={{ width: 100, height: 100 }} />
          ) : null}
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

export default connect(mapStateToProps, { change_password, clearMessages, clearErrors })(
  ChangePassword
);
