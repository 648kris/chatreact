import axios from 'axios';
import {FETCH_USER} from './types';
import {FETCH_MESSAGES} from './types';
import {LOGIN_USER} from './types';
import {CREATE_USER} from './types';
import {POST_MESSAGE} from './types';

let apiPath = "http://localhost:5000";
//if(process.env )
console.log("env = " + process.env);

export const fetchUser = () => {
  console.log("fetchuser ACTION")
  return function(dispatch){
    axios.get(apiPath + '/currentuser',  {withCredentials: true})
      .then(res => dispatch({ type: FETCH_USER, payload: res.data }))
  }
};

export const fetchMessages = () => {
  console.log("fetchmessages ACTION")
  return function(dispatch){
    axios.get(apiPath + '/messages',  {withCredentials: true})
      .then(res => dispatch({ type: FETCH_MESSAGES, payload: res.data }))
  }
};

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

export const postMessage = (message) => {
  return function(dispatch){
    axios.post(apiPath + '/newmessage', {}, {params:{message: message}} )
      .then(res => dispatch({ type: POST_MESSAGE, payload: res }) )
  }
};
