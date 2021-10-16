/* eslint-disable camelcase */
import {
  LOADING_CREATE_EMPLOYEE,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_FAIL,
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_FAIL,
  GET_EMPLOYEE_LOADING
} from '../actions/types';

const initialState = {
  loading_create_employee: false,
  loading_get_employee: false,
  new_employee: null,
  employees_data: null
};

export default function employees(state = initialState, action) {
  switch (action.type) {
    case LOADING_CREATE_EMPLOYEE:
      return {
        ...state,
        loading_create_employee: true
      };
    case GET_EMPLOYEE_LOADING:
      return {
        ...state,
        loading_get_employee: true
      };
    case GET_EMPLOYEE_FAIL:
      return {
        ...state,
        loading_get_employee: false
      };
    case GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading_get_employee: false,
        employees_data: action.payload
      };
    case CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading_create_employee: false,
        new_employee: action.payload
      };
    case CREATE_EMPLOYEE_FAIL:
      return {
        ...state,
        loading_create_employee: false
      };
    default:
      return state;
  }
}
