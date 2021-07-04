import { READ_USER } from '../actions'

export default (state = "", action) => {
    switch(action.type) {
        case READ_USER:
            return action.res.data;
        default:
            return "";
    }
}