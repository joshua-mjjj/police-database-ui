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
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

import { create_employee } from '../../../actions/employee';
import { clearMessages } from '../../../actions/messages';
import { clearErrors } from '../../../actions/errors';

// ----------------------------------------------------------------------

function EmployeeAdd(props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    sur_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Sur name required'),
    first_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    serial_number: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Serial number required'),
    force_number: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Force number required'),
    place_of_work: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Place of work required'),
    computer_number: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Computer number required'),
    rank: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Rank is required'),
    file_number: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('File number required')
  });

  const date = new Date();
  const currentdate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; // Initializing current date
  const [value, setValue] = React.useState(currentdate);
  const [valueDOP, setValueDOP] = React.useState(currentdate);
  const [valueDOE, setValueDOE] = React.useState(currentdate);
  const [valueDOEsta, setValueDOEsta] = React.useState(currentdate);
  const [status, setStatus] = React.useState(null);
  const [onleave, setLeave] = React.useState(null);
  const [department, setDepartment] = React.useState(null);
  const [title, setTitle] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      sur_name: '',
      first_name: '',
      serial_number: '',
      force_number: '',
      place_of_work: '',
      computer_number: '',
      rank: '',
      file_number: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      props.create_employee(
        values.sur_name,
        values.first_name,
        values.serial_number,
        values.force_number,
        values.place_of_work,
        values.computer_number,
        values.rank,
        title,
        department,
        values.file_number,
        value,
        valueDOP,
        valueDOE,
        valueDOEsta,
        status,
        onleave
      );
    }
  });

  // if (props.auth.isAuthenticated === true) {
  //   console.log('Authenticated: ', props.auth.isAuthenticated);
  //   window.location.href = '/dashboard';
  // }

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

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
    if (type === 'error' && page === 'employees_list') {
      alert = (
        <Stack spacing={3}>
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
    } else if (type === 'info' && page === 'employees_list') {
      alert = (
        <Stack spacing={3}>
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
    } else if (type === 'success' && page === 'employees_list') {
      alert = (
        <Stack spacing={3}>
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

  if (props.errors.msg !== null) {
    if (props.errors.msg.length > 1) {
      if (props.errors.msg.old_password) {
        if (props.errors.msg.old_password[0] === 'Wrong password.') {
          console.log(props.errors.msg.old_password);
          alert = (
            <Stack spacing={3}>
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
                    The old password you entered is wrong, please provide a correct old password
                    inorder to change your password.
                  </div>
                </Alert>
              </Collapse>
            </Stack>
          );
        }
      }
    }
    if (props.errors.msg.computer_number) {
      console.log(props.errors.msg.computer_number);
      alert = (
        <Stack spacing={3}>
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
              <div>{props.errors.msg.computer_number}</div>
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
  // {

  const handleChangeDOB = (newValue) => {
    const dt = new Date(newValue);
    const formatted_dt = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
    setValue(formatted_dt);
    console.log(formatted_dt);
  };

  const handleChangeDOE = (newValue) => {
    const dt = new Date(newValue);
    const formatted_dt = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
    setValueDOE(formatted_dt);
    console.log(formatted_dt);
  };

  const handleChangeDOP = (newValue) => {
    const dt = new Date(newValue);
    const formatted_dt = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
    setValueDOP(formatted_dt);
    console.log(formatted_dt);
  };

  const handleChangeDOEsta = (newValue) => {
    const dt = new Date(newValue);
    const formatted_dt = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
    setValueDOEsta(formatted_dt);
    console.log(formatted_dt);
  };

  const handleChangeStatus = (newValue) => {
    setStatus(newValue.target.value);
    console.log(newValue.target.value);
  };

  const handleChangeLeave = (newValue) => {
    setLeave(newValue.target.value);
    console.log(newValue.target.value);
  };

  const handleChangeDepartment = (newValue) => {
    setDepartment(newValue.target.value);
    console.log(newValue.target.value);
  };

  const handleChangetitle = (newValue) => {
    setTitle(newValue.target.value);
    console.log(newValue.target.value);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Sur name"
              {...getFieldProps('sur_name')}
              error={Boolean(touched.sur_name && errors.sur_name)}
              helperText={touched.sur_name && errors.sur_name}
            />

            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('first_name')}
              error={Boolean(touched.first_name && errors.first_name)}
              helperText={touched.first_name && errors.first_name}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Serial number"
              {...getFieldProps('serial_number')}
              error={Boolean(touched.serial_number && errors.serial_number)}
              helperText={touched.serial_number && errors.serial_number}
            />

            <TextField
              fullWidth
              label="Force number"
              {...getFieldProps('force_number')}
              error={Boolean(touched.force_number && errors.force_number)}
              helperText={touched.force_number && errors.force_number}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Place of work"
              {...getFieldProps('place_of_work')}
              error={Boolean(touched.place_of_work && errors.place_of_work)}
              helperText={touched.place_of_work && errors.place_of_work}
            />

            <TextField
              fullWidth
              label="File number"
              {...getFieldProps('file_number')}
              error={Boolean(touched.file_number && errors.file_number)}
              helperText={touched.file_number && errors.file_number}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Rank"
              {...getFieldProps('rank')}
              error={Boolean(touched.rank && errors.rank)}
              helperText={touched.rank && errors.rank}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Title</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={title}
                label="title"
                onChange={handleChangetitle}
              >
                <MenuItem value="commander">Commander</MenuItem>
                <MenuItem value="deputy_commander">Deputy Commander</MenuItem>
                <MenuItem value="staff_officer">Staff Officer</MenuItem>
                <MenuItem value="armoury">Armoury</MenuItem>
                <MenuItem value="head_operations">Head Operations</MenuItem>
              </Select>
            </FormControl>

            {/* <TextField
              fullWidth
              label="Title"
              {...getFieldProps('title')}
              error={Boolean(touched.title && errors.title)}
              helperText={touched.title && errors.title}
            /> */}
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Computer number"
              {...getFieldProps('computer_number')}
              error={Boolean(touched.computer_number && errors.computer_number)}
              helperText={touched.computer_number && errors.computer_number}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={department}
                label="department"
                onChange={handleChangeDepartment}
              >
                <MenuItem value="un_agencies">UN Agencies</MenuItem>
                <MenuItem value="embassy_high">Embassy High</MenuItem>
                <MenuItem value="jlot">JLOT</MenuItem>
                <MenuItem value="body_gaurd">Body Guard</MenuItem>
                <MenuItem value="authorities">Authorities</MenuItem>
                <MenuItem value="ministries">Ministries</MenuItem>
              </Select>
            </FormControl>

            {/* <TextField
              fullWidth
              label="Department"
              {...getFieldProps('department')}
              error={Boolean(touched.department && errors.department)}
              helperText={touched.department && errors.department}
            /> */}
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChangeStatus}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="sick">Sick</MenuItem>
                <MenuItem value="absent">Absent</MenuItem>
                <MenuItem value="dead">Dead</MenuItem>
                <MenuItem value="transferred">Transferred</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
                <MenuItem value="dismissed">Dismissed</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">On leave</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={onleave}
                label="On leave"
                onChange={handleChangeLeave}
              >
                <MenuItem value="pass_leave">Pass leave</MenuItem>
                <MenuItem value="annual_leave">Annnual leave</MenuItem>
                <MenuItem value="maternity_leave">Maternity leave</MenuItem>
                <MenuItem value="not_on_leave">None</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <DesktopDatePicker
                label="Date of birth"
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={handleChangeDOB}
                renderInput={(params) => <TextField {...params} fullWidth label="Date of birth" />}
              />

              <DesktopDatePicker
                label="Date of Enlishment"
                inputFormat="MM/dd/yyyy"
                value={valueDOE}
                onChange={handleChangeDOE}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Date of Enlishment" />
                )}
              />
            </Stack>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <DesktopDatePicker
                label="Date of Posting"
                inputFormat="MM/dd/yyyy"
                value={valueDOP}
                onChange={handleChangeDOP}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Date of Posting" />
                )}
              />
              <DesktopDatePicker
                label="Date of Establishment"
                inputFormat="MM/dd/yyyy"
                value={valueDOEsta}
                onChange={handleChangeDOEsta}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Date of Establishment" />
                )}
              />
            </Stack>
          </LocalizationProvider>
          {alert}
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            // loading={isSubmitting}
          >
            Save
            {props.employees.loading_create_employee === true ? (
              <Box component="img" src="/static/loading.gif" sx={{ width: 100, height: 100 }} />
            ) : null}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  auth: state.auth,
  errors: state.errors,
  employees: state.employees
});

export default connect(mapStateToProps, { create_employee, clearMessages, clearErrors })(
  EmployeeAdd
);
