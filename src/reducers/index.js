import { combineReducers } from 'redux';
import messagesReducer from './messagesReducer';
import authReducer from './authReducer';

export default combineReducers({
  messages: messagesReducer,
  auth: authReducer
});
