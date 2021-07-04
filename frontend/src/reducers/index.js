import {combineReducers} from 'redux';
import auth from './auth';
import userRegistration from './userRegistration'
import user from './user'
import book from './book'
import reservation from './reservation'
import { reducer as form } from 'redux-form'

export default combineReducers({auth, userRegistration, user, book, reservation, form})
