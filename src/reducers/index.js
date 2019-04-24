import { combineReducers } from 'redux';
import messagesReducer from './messagesReducer';
import authReducer from './authReducer';
import selectUserReducer from './selectUserReducer';
import conversationsReducer from './conversationsReducer';

export default combineReducers({
  messages: messagesReducer,
  auth: authReducer,
  recipient: selectUserReducer,
  conversations: conversationsReducer,
});
