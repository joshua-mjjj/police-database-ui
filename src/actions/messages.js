import { CREATE_MESSAGES, CLEAR_MESSAGES } from './types';

/* eslint-disable camelcase */
// CREATE MESSAGE
export const createMessage = (msg, type_, page) => ({
  type: CREATE_MESSAGES,
  payload: msg,
  message_type: type_,
  message_page: page
});

// CLEAR MESSAGE
export const clearMessages = () => ({
  type: CLEAR_MESSAGES
});
