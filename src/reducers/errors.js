import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  msg: null,
  status: null,
  message_page: null
};

export default function errors(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        message_page: action.payload.page
      };
    case CLEAR_ERRORS:
      return {
        msg: null,
        status: null,
        message_page: null
      };
    default:
      return state;
  }
}
