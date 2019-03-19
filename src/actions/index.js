import axios from 'axios';
import {FETCH_USER} from './types';
import {LOGIN_USER} from './types';
import {CREATE_USER} from './types';

let apiPath = "http://localhost:5000";
//if(process.env )
console.log("env = " + process.env);

export const fetchUser = () => {
  console.log("fetchuser ACTION")
  return function(dispatch){
    axios.get(apiPath + '/currentuser')
      .then(res => dispatch({ type: FETCH_USER, payload: res }))
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
}
