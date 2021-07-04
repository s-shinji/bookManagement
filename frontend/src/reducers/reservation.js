import {RESERVATION_STATUS} from '../actions';

export default (state = 0, action) => {
  switch(action.type) {
      case RESERVATION_STATUS:
          return action.res;
      default:
          return state;
  }
}