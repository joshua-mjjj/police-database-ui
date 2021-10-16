import axios from 'axios';
import { returnError } from './errors';
import { createMessage } from './messages';

import {
  LOADING_CREATE_EMPLOYEE,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_FAIL,
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_FAIL,
  GET_EMPLOYEE_LOADING
} from './types';

/* eslint-disable camelcase */
// CREATE EMPLOYEE
export const create_employee =
  (
    sur_name,
    first_name,
    serial_number,
    force_number,
    place_of_work,
    computer_number,
    rank,
    title,
    department,
    file_number,
    date_of_birth,
    date_of_posting,
    date_of_enlishment,
    date_of_establishment,
    status,
    on_leave
  ) =>
  (dispatch, getState) => {
    // Loading
    dispatch({ type: LOADING_CREATE_EMPLOYEE });

    // Request Body
    const body = JSON.stringify({
      sur_name,
      first_name,
      serial_number,
      force_number,
      place_of_work,
      computer_number,
      rank,
      title,
      department,
      file_number,
      date_of_birth,
      date_of_posting,
      date_of_enlishment,
      date_of_establishment,
      status,
      on_leave
    });
    console.log(body);

    axios
      // .post('http://127.0.0.1:8000/api/v1/employees/', body, tokenConfig(getState))
      .post(`${process.env.REACT_APP_API_URL}api/v1/employees/`, body, tokenConfig(getState))
      .then((res) => {
        console.log(res);
        dispatch({
          type: CREATE_EMPLOYEE_SUCCESS,
          payload: res.data
        });
        dispatch(
          createMessage(
            `${sur_name}'s data has been successfully saved in the database.`,
            'success',
            'employees_list'
          )
        );
      })
      .catch((err) => {
        // console.log(err.response.status);
        if (err) {
          dispatch({ type: CREATE_EMPLOYEE_FAIL });
          dispatch(returnError(err.response.data, err.response.status, 'employees_create'));
        }
      });
  };

// FETCH EMPLOYEES
export const get_employees = () => (dispatch, getState) => {
  // Loading
  dispatch({ type: GET_EMPLOYEE_LOADING });

  axios
    // .get('http://127.0.0.1:8000/api/v1/employees/', tokenConfig(getState))
    .get(`${process.env.REACT_APP_API_URL}api/v1/employees/`, tokenConfig(getState))
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_EMPLOYEE_SUCCESS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data, err.response.status, 'employees_list'));
      dispatch({
        type: GET_EMPLOYEE_FAIL
      });
    });
};

// setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const { token } = getState().auth;
  // console.log(token)

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // if token, add to headers in config
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
};
