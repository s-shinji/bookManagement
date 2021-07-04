import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { readBookDetails } from '../actions';
import { postSlackButton } from '../actions';
import ReactStarsRating from 'react-awesome-stars-rating'
import Loading from './loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import _ from 'lodash';
import Header from './header';


class BookDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myReviewTab: false,
      othersReviewTab: true
    }
    this.handleMyReviewTab = this.handleMyReviewTab.bind(this)
    this.handleOthersReviewTab = this.handleOthersReviewTab.bind(this)
    this.renderMiddleContent = this.renderMiddleContent.bind(this)
    this.handleSlackReservationButton = this.handleSlackReservationButton.bind(this)
    this.renderSlackButton = this.renderSlackButton.bind(this)
  }
  componentDidMount() {
    const urlPath = this.props.location.pathname
    const userId = urlPath.substring(urlPath.indexOf("user") + 5, urlPath.indexOf("book") - 1)
    const bookId = urlPath.slice(urlPath.indexOf("book") + 5)
    this.props.readBookDetails(userId, bookId)
  }
  // componentDidUpdate(prevProps) {
  //   console.log(prevProps)
  //   if(prevProps.bookInfo != "" && this.props.reservationStatus != prevProps.reservationStatus) {
  //     const urlPath = this.props.location.pathname
  //     const userId  = urlPath.substring(urlPath.indexOf("user") + 5, urlPath.indexOf("book") - 1)
  //     const bookId  = urlPath.slice(urlPath.indexOf("book") + 5)
  //     this.props.readBookDetails(userId, bookId)
  //   }
  // }
  handleMyReviewTab() {
    this.setState({
      myReviewTab: true,
      othersReviewTab: false
    })
  }
  handleOthersReviewTab() {
    this.setState({
      myReviewTab: false,
      othersReviewTab: true
    })
  }
  renderMiddleContent() {
    const book = this.props.bookInfo
    const handleOthersReviews = _.map(this.props.bookInfo.othersReviews, (value, key) => {
      return (
        <div className="othersReviewsBox">
          <div className="othersInfoBox">
            {value.userIcon == "default.jpeg" ?
              <img className="othersImg" src={`${process.env.PUBLIC_URL}/images/${value.userIcon}`} />
              :
              <img className="othersImg" src={value.userIcon} />
            }
            <div className="othersInfo">
              <div className="othersInfo__name">{value.name}</div>
              <div className="othersReviewPointBox">
                <ReactStarsRating value={value.reviewPoint} className="othersReviewPoint" />
                <span className="othersReviewPointText">{value.reviewPoint}</span>
              </div>
            </div>
          </div>
          <div className="otherReviewSentences">
            <div>{value.reviewSentence}</div>
          </div>

        </div>
      )
    })

    if (this.state.myReviewTab) {
      return (
        <React.Fragment>
          <div className="bookDetails__myReview">
            <div className="myReviewBox">
              {this.props.loginUserId == book.bookDetail.userId ?
                <Link to={`/user/${book.bookDetail.userId}`}>
                  {book.bookDetail.userIcon == "default.jpeg" ?
                    <img className="myImg" src={`${process.env.PUBLIC_URL}/images/${book.bookDetail.userIcon}`} />
                    :
                    <img className="myImg" src={book.bookDetail.userIcon} />
                  }
                </Link>
                :
                <div>
                  {book.bookDetail.userIcon == "default.jpeg" ?
                    <img className="myImg" src={`${process.env.PUBLIC_URL}/images/${book.bookDetail.userIcon}`} />
                    :
                    <img className="myImg" src={book.bookDetail.userIcon} />
                  }
                </div>
              }
              <div className="myInfoBox">
                <div className="myInfoBox__name">{book.bookDetail.name}</div>
                <div className="myReviewPointBox">
                  <ReactStarsRating value={book.bookDetail.myReviewPoint} className="myReviewPoint" />
                  <span className="myReviewPointText">{book.bookDetail.myReviewPoint}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bookDetails__bottom">
            <div className="title">Myレビュー</div>
            <div className="myReviewSentence">{book.bookDetail.myReviewSentence}</div>
          </div>
        </React.Fragment>

      )
    } else {
      return (
        <React.Fragment>
          <div className="bookDetails__othersReviews">
            <div className="reviewAverageBox">
              <ReactStarsRating value={book.reviewAverage} className="reviewAverage" />
              <span className="reviewAverageText">{book.reviewAverage}</span>
            </div>
            {this.props.loginUserId != book.bookDetail.userId ?
              <Link to={`/user/${book.bookDetail.userId}/book/${book.bookDetail.id}/registerReview`} className="newReviewButton">レビューを追加する</Link>
              : ""
            }
          </div>
          <div className="bookDetails__bottom">
            {handleOthersReviews}
          </div>
        </React.Fragment>
      )
    }
  }

  handleSlackReservationButton() {
    const reservationInfo = {}
    reservationInfo.status = this.props.reservationStatus
    reservationInfo.bookOwnerName = this.props.bookInfo.bookDetail.name
    reservationInfo.loginUserName = this.props.loginUser.name
    reservationInfo.bookTitle = this.props.bookInfo.bookDetail.title
    reservationInfo.bookId = this.props.bookInfo.bookDetail.id
    this.props.postSlackButton(reservationInfo)
  }

  renderSlackButton() {
    if (this.props.bookInfo.bookDetail.name == this.props.loginUser.name) {
    } else if (this.props.reservationStatus == 0) {
      return (
        <button className="reservationButton" onClick={this.handleSlackReservationButton}>予約する</button>
      )
    } else if (this.props.reservationStatus == 1) {
      return (
        <button className="returnButton" onClick={this.handleSlackReservationButton}>貸出中</button>
      )
    }
  }

  render() {
    const book = this.props.bookInfo
    /*
    componentDidMount初回のrenderの後に呼ばれるため、book.bookDetailがundefinedの時にエラーが起きる。
    その対処としてundefinedの場合にはLoadingコンポーネントを差し込む
    */
    if (book.bookDetail == undefined) {
      return <Loading />
    }

    return (
      <React.Fragment>
        <Header />
        <div className="bookDetailsContainer">
          <div className="bookDetails">
            <div className="bookDetails__top">
              <div className="bookDetails__top__upper">
                <div className="bookInfoBox">
                  {book.bookDetail.image == "noImage.jpg" ?
                    <img className="bookImg" src={`${process.env.PUBLIC_URL}/images/${book.bookDetail.image}`} />
                    :
                    <img className="bookImg" src={book.bookDetail.image} />
                  }
                  <div className="bookInfoBox__right">
                    <div className="bookTitle">{book.bookDetail.title}</div>
                    <div className="bookAuthor">
                      <FontAwesomeIcon icon={faUser} className="authorIcon" />
                      <div>{book.bookDetail.author}</div>
                    </div>
                    {this.renderSlackButton()}
                  </div>
                </div>
              </div>
              <div className="bookDetails__top__lower">
                <div id="myReviewTab" className={this.state.myReviewTab ? "reviewTab" : ""} onClick={this.handleMyReviewTab}>Myレビュー</div>
                <div id="othersReviewTab" className={this.state.othersReviewTab ? "reviewTab" : ""} onClick={this.handleOthersReviewTab}>みんなのレビュー</div>
              </div>
            </div>
            {this.renderMiddleContent()}
          </div>
        </div>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => ({ bookInfo: state.book.bookDetail, loginUserId: state.auth.id, loginUser: state.auth, reservationStatus: state.reservation })
const mapDispatchToProps = ({ readBookDetails, postSlackButton })
export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);
