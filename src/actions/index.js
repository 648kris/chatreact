import axios from 'axios';
import {FETCH_USER} from './types';
import {FETCH_MESSAGES} from './types';
import {LOGIN_USER} from './types';
import {CREATE_USER} from './types';
import {POST_MESSAGE} from './types';
import {SELECT_USER} from './types';
import {FETCH_CONVERSATIONS} from './types';

let apiPath = "http://localhost:5000";

export const selectUser = (recipient) => {
  return function(dispatch){
    dispatch({ type: SELECT_USER, payload: recipient})
  }
};

export const fetchUser = () => {
  return function(dispatch){
    axios.get(apiPath + '/currentuser',  {withCredentials: true})
      .then(res => dispatch({ type: FETCH_USER, payload: res.data }))
  }
};

export const fetchMessages = (otherUser) => {
  return function(dispatch){
    axios.get(apiPath + '/messages', {params:{otherUser: otherUser}, withCredentials: true})
      .then(res => dispatch({ type: FETCH_MESSAGES, payload: res.data }))
  }
};

export const fetchConversations = () => {
  return function(dispatch){
    axios.get(apiPath + '/conversations', {withCredentials: true})
      .then(res => dispatch({ type: FETCH_CONVERSATIONS, payload: res.data }))
  }
}

export const loginUser = (username, password) => {
  return function(dispatch){
    axios.post(apiPath + '/login', {}, {params:{username: username, password: password}, withCredentials: true})
      .then(res => dispatch({ type: LOGIN_USER, payload: res }))
  }
};

export const createUser = (username, password) => {
  return function(dispatch){
    axios.post(apiPath + '/createaccount', {}, {params:{username: username, password: password}})
      .then(res => dispatch({ type: CREATE_USER, payload: res }))
  }
};

export const postMessage = (text, recipient) => {
  return function(dispatch){
    axios.post(apiPath + '/newmessages', {}, {params:{text: text, recipient: recipient}, withCredentials: true} )
      .then(res => dispatch({ type: POST_MESSAGE, payload: res }) )
  }
};
