import React,{ Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import ReactStarsRating from 'react-awesome-stars-rating'
import {Field, reduxForm} from 'redux-form';
import {postReviewReg} from '../actions';
import Header from './header';

class ReviewRegistration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviewPoint: 0,
    }
  this.onChange = this.onChange.bind(this)
  this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(value) {
    this.setState({
      reviewPoint: value
    });
  }

  async onSubmit(values) {
    const urlPath = this.props.location.pathname
    const userId  = urlPath.substring(urlPath.indexOf("user") + 5, urlPath.indexOf("book") - 1)
    const bookId  = urlPath.substring(urlPath.indexOf("book") + 5, urlPath.indexOf("registerReview") - 1)
    values.userId = userId
    values.bookId = bookId
    values.reviewPoint = this.state.reviewPoint
    await this.props.postReviewReg(values)
    await this.props.history.push(`/user/${userId}/book/${bookId}`)
  }

  render() {
    const { reviewPoint } = this.state
    const { handleSubmit } = this.props

    return(
      <React.Fragment>
        <Header />
        <div className="reviewRegistrationContainer">
          <form className="reviewRegistration" onSubmit={handleSubmit(this.onSubmit)}>
            <div className="reviewRegistration__box">
              <div className="otherInfoBox">
                <p>おすすめ度</p>
                  <ReactStarsRating onChange={this.onChange} value={reviewPoint} className="reviewPoint" required/>
                  <span className="reviewPointText">{reviewPoint}</span>
              </div>
              <hr/>

              <div className="otherInfoBox review"> 
                <p>自己レビュー</p>
                <Field className="reviewTextArea" component="textarea" name="reviewSentence"></Field>
              </div>
              {reviewPoint == 0 ?
                <button className="submitBtn" type="submit" disabled>登録</button>
              :
                <button className="submitBtn" type="submit">登録</button>
              }
            </div>
          </form>
        </div>
      </React.Fragment>
    )
  }
}
const mapDispatchToProps = ({ postReviewReg })

export default connect(null, mapDispatchToProps)(reduxForm({form:"reviewRegForm"})(ReviewRegistration));
