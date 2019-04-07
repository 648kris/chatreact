import {SELECT_USER} from '../actions/types'

export default function(state = {}, action) {
  console.log("selectUser ACTION type = "+action.type)
  console.log(action.payload)
  switch (action.type) {
    case SELECT_USER:
      return action.payload || false
    default:
      return state;
  }
}
