import { READ_BOOKS, READ_BOOK_DETAIL } from '../actions'
const initialState = {
  books: '',
  bookDetail: ''
}
export default(state = initialState, action) => {
  switch(action.type) {
    case READ_BOOKS: 
      return {
        ...state,
        books: action.res.data
      };
    case READ_BOOK_DETAIL:
      return {
        ...state,
        bookDetail: action.res.data
      }
    default:
        return state;
  }
}