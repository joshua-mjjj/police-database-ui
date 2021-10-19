/* eslint-disable camelcase */
import axios from 'axios';
import { returnError } from './errors';
import { createMessage } from './messages';

import {
  LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOADING_CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_SUCCESS
} from './types';

// LOAD USER
export const loadUser = () => (dispatch, getState) => {
  axios
    // .get('http://127.0.0.1:8000/api/v1/auth/user', tokenConfig(getState))
    .get('https://police-database-api.herokuapp.com/api/v1/auth/user', tokenConfig(getState))
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data, err.response.status, 'auth'));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//  LOGIN
export const login = (username, password, uniqueID) => (dispatch) => {
  // Loading
  dispatch({ type: LOADING });

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request Body
  const body = JSON.stringify({ username, password, uniqueID });
  console.log(body);

  axios
    // .post('http://127.0.0.1:8000/api/v1/auth/login', body, config)
    .post('https://police-database-api.herokuapp.com/api/v1/auth/login', body, config)
    .then((res) => {
      console.log(res);
      if (res.data.status === 3000) {
        console.log('Auth error');
        dispatch(
          createMessage(
            'Please make sure you are authorized to log into the system.',
            'info',
            'login'
          )
        );
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch((err) => {
      // console.log(err.response.status);
      if (err) {
        dispatch({ type: LOGIN_FAIL });
        dispatch(returnError(err.response.data, err.response.status, 'auth'));
      }
    });
};

/* eslint-disable camelcase */
//  CHANGE PASSWORD
export const change_password = (old_password, new_password, uniqueID) => (dispatch, getState) => {
  // Loading
  dispatch({ type: LOADING_CHANGE_PASSWORD });

  // Request Body
  const body = JSON.stringify({ old_password, new_password, uniqueID });
  console.log(body);

  axios
    // .put('http://127.0.0.1:8000/api/v1/change-password/', body, tokenConfig(getState))
    .put(
      'https://police-database-api.herokuapp.com/api/v1/change-password/',
      body,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      if (res.data.status === 4000) {
        console.log('Auth error');
        dispatch(
          createMessage(
            'Please make sure you provide a valid USER ID in order to complete this task.',
            'error',
            'change_password'
          )
        );
        dispatch({ type: CHANGE_PASSWORD_FAIL });
      } else {
        dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
          payload: res.data
        });
        dispatch(createMessage('Password successfully changed.', 'success', 'change_password'));
      }
    })
    .catch((err) => {
      // console.log(err.response.status);
      if (err) {
        dispatch({ type: CHANGE_PASSWORD_FAIL });
        dispatch(returnError(err.response.data, err.response.status, 'change_password'));
      }
    });
};

//  LOGOUT
export const logout = () => (dispatch, getState) => {
  console.log('logging out ...');
  axios
    // .post('http://127.0.0.1:8000/api/v1/auth/logout', null, tokenConfig(getState))
    .post(
      'https://police-database-api.herokuapp.com/api/v1/auth/logout',
      null,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch((err) => {
      dispatch(returnError(err.response.data, err.response.status, 'auth'));
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
