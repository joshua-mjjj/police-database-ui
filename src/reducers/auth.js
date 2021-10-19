/* eslint-disable camelcase */
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
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  looading_auth: false,
  looading_change_password: false,
  user: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case LOADING:
      return {
        ...state,
        looading_auth: true
      };
    case LOADING_CHANGE_PASSWORD:
      return {
        ...state,
        looading_change_password: true
      };
    case CHANGE_PASSWORD_FAIL:
    case CHANGE_PASSWORD_SUCCESS: // just remove the progress report.
      return {
        ...state,
        looading_change_password: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload.user,
        isAuthenticated: true,
        looading_auth: false
      };
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        looading_auth: false
      };
    default:
      return state;
  }
}
