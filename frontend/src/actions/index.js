import axios from 'axios';
import { values } from 'lodash';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const USERREG = 'USERREG';
export const READ_USER = 'READ_USER';
export const READ_BOOKS = 'READ_BOOKS';
export const READ_BOOK_DETAIL = 'READ_BOOK_DETAIL';
export const RESERVATION_STATUS = 'RESERVATION_STATUS';

export const postLogin = values => async dispatch =>{
  const params = new URLSearchParams()
  params.append('userName', values.userName)
  params.append('password', values.password)

  let res = await axios.post('/authenticate', params)
  //デプロイ時変更必要
  if(res.request.responseURL == "http://localhost:8080/login-error") {
    res.data = 0;
  }
  dispatch({type: LOGIN, res})
}

export const postLogout = () => async dispatch =>{
  let res = await axios.post('/logout')
  dispatch({type: LOGOUT, res})
}

export const postUserReg = values => async dispatch =>{
  const params = new URLSearchParams()
  params.append('name',values.name)
  params.append('email',values.email)
  params.append('password',values.password)
  params.append('passwordConfirmation',values.passwordConfirmation)
  const res = await axios.post('/register', params)
  dispatch({type: USERREG, res})
}

export const readUser = () => async dispatch => {
    const res = await axios.get('/api/home')
    dispatch({type: READ_USER, res})
}

export const postBookReg = values => async dispatch => {
const formData = new FormData()
  if(values.image) {
    formData.append('image', values.image)
  }
  formData.append('title', values.title)
  formData.append('author', values.author)
  formData.append('type', values.type)
  formData.append('reviewPoint', values.reviewPoint)
  if(values.reviewSentence) {
    formData.append('reviewSentence', values.reviewSentence)
  }
  const res = await axios.post('/api/registerBook', formData)

}

export const readBooks = userId => async dispatch => {
  const res = await axios.get(`/api/user/${userId}/books`)
  dispatch({type: READ_BOOKS, res})
}

export const readBookDetails = (userId, bookId) => async dispatch => {
  const res = await axios.get(`/api/user/${userId}/book/${bookId}`)
  dispatch({type: READ_BOOK_DETAIL, res})
}

export const postUserIcon = userInfo => async dispatch => {
  const formData = new FormData()
  formData.append('userIcon', userInfo.userIcon)
  const res = await axios.post(`/api/user/${userInfo.userId}`, formData)
}

export const postReviewReg = values => async dispatch => {
  const params = new URLSearchParams()
    params.append('reviewPoint', values.reviewPoint)
    if(values.reviewSentence) {
      params.append('reviewSentence', values.reviewSentence)
    }
    const res = await axios.post(`/api/user/${values.userId}/book/${values.bookId}/registerReview`, params)
}

export const postSlackButton = values => async dispatch => {
  //書籍を予約する場合
  if(values.status == 0) {
    const params = new URLSearchParams()
    params.append('status', 1)
    await axios.post(process.env.REACT_APP_SLACK_BOT_TOKEN, JSON.stringify(
      {'text':`<!channel>\n${values.bookOwnerName}さん\n${values.loginUserName}さんが${values.bookTitle}を予約しました。`}), {
          transformRequest: [(data, headers) => {
        delete headers.post["Content-Type"]
        return data
      }]

    })
    await axios.post(`/api/reservationStatus/${values.bookId}`, params)
    var res = 1
    dispatch({type: RESERVATION_STATUS, res})
  //書籍を返却した場合
  }else{
    const params = new URLSearchParams()
    params.append('status', 0)
    await axios.post(process.env.REACT_APP_SLACK_BOT_TOKEN, JSON.stringify(
      {'text':`<!channel>\n${values.loginUserName}さんが${values.bookTitle}を返却しました。`}), {
          transformRequest: [(data, headers) => {
        delete headers.post["Content-Type"]
        return data
      }]

    })
    await axios.post(`/api/reservationStatus/${values.bookId}`, params)
    var res = 0
    dispatch({type: RESERVATION_STATUS, res})
  }
}
  