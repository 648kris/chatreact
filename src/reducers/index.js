import { combineReducers } from 'redux';
import messagesReducer from './messagesReducer';
import authReducer from './authReducer';
import loginReducer from './loginReducer';
import createUserReducer from './createUserReducer';

export default combineReducers({
  messages: messagesReducer,
  auth: authReducer,
  login: loginReducer,
  createuser: createUserReducer,
});
