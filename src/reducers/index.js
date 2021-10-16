import { combineReducers } from 'redux';

import auth from './auth';
import errors from './errors';
import messages from './messages';
import employees from './employees';

export default combineReducers({
  auth,
  messages,
  employees,
  errors
});
