import {FETCH_CONVERSATIONS} from '../actions/types'

export default function(state = {}, action) {
  switch (action.type){
    case FETCH_CONVERSATIONS:
      return action.payload || false;
    default:
      return state
  }
}
