/* eslint-disable camelcase */
import { GET_ERRORS, CLEAR_ERRORS } from './types';

// RETURN ERRORS
// takes in status code for now, may be more parameters in future
export const returnError = (msg, status, page) => ({
  type: GET_ERRORS,
  payload: { msg, status, page }
});

// CLEAR ERRORS
export const clearErrors = (msg) => ({
  type: CLEAR_ERRORS
});
