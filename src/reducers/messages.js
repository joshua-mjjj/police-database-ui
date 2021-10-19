/* eslint-disable camelcase */
import { CREATE_MESSAGES, CLEAR_MESSAGES } from '../actions/types';

const initialState = {
  system_message: null,
  message_type: null,
  message_page: null
};

export default function messages(state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGES:
      return {
        ...state,
        system_message: action.payload,
        message_type: action.message_type,
        message_page: action.message_page
      };
    case CLEAR_MESSAGES:
      return {
        system_message: null,
        message_type: null,
        message_page: null
      };
    default:
      return state;
  }
}
