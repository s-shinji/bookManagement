import {LOGIN,LOGOUT} from '../actions'

export default (state = { id: 0 },action) =>{
  switch(action.type) {
    case LOGIN:
    case LOGOUT:
      return action.res.data;
    default:
      return state;
  }
}