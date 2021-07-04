import {USERREG} from '../actions'

export default (state = 0, action) => {
    switch(action.type) {
        case USERREG:
            return action.res.data;
        default:
            return state;
    }

}
