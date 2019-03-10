import axios from 'axios';
import {FETCH_USER} from './types';

let apiPath = "http://localhost:5000";
//if(process.env )
console.log("env = " + process.env);

export const fetchUser = () => {
  console.log("fetchuser ACTION")
  return function(dispatch){
    axios.get(apiPath + '/currentuser')
      .then(res => dispatch({ type: FETCH_USER, payload: res}))
  }
};
