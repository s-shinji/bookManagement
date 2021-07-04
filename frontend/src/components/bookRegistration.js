import React,{Component} from 'react';
import {connect} from 'react-redux';
import uploadIcon from '../images/pixabay.png';
import _ from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import ReactStarsRating from 'react-awesome-stars-rating'
import {Field,reduxForm} from 'redux-form';
import {postBookReg} from '../actions';
import Header from './header';

class BookRegistration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviewPoint: 0,
      imageData: null,
    }
    this.onChange = this.onChange.bind(this)
    this.imageDataChange = this.imageDataChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(value) {
    this.setState({
      reviewPoint: value
    });
  }

  imageDataChange(e) {
    const files = e.target.files

    if(files.length > 0) {
      let file = files[0]
      let reader =  new FileReader()
      reader.onload = (e) => {
        this.setState({ imageData: e.target.result })
      }
      reader.readAsDataURL(file)
    } else {
      this.setState({ imageData: null })
    }
  }

  async onSubmit(values) {
    if(document.getElementById("bookImage").files[0]) {
        values.image = document.getElementById("bookImage").files[0]
    }
    values.reviewPoint = this.state.reviewPoint
    await this.props.postBookReg(values)
    await this.props.history.push(`/user/${this.props.loginUserId}/books`)
  }

  render() {
    const { reviewPoint } = this.state
    const { handleSubmit, pristine, submitting, invalid } = this.props
    // const reviewPoint = () => {
    //   const items = [];
    //   let num = 0
    //   for (let i = 0; i <= 50; i++) {
    //       if (i == 0) {
    //         items.push(<option key={num}>{num}</option>)
    //       } else {
    //         //「0.30000000000000004」を回避するための処理
    //         num += 0.1
    //         num = (Math.round(num * 10) / 10)
    //         items.push(<option key={num}>{num}</option>)
    //       }
    //   }
    //   return <select className="reviewPoint">{items}</select>;
    // }
  
    return(
      <React.Fragment>
        <Header />
        <div className="bookRegistrationContainer">
          <form className="bookRegistration" encType="multipart/form-data" onSubmit={handleSubmit(this.onSubmit)}>
            <div className="bookRegistration__box">
              <div className="bookRegistration__box__upper">
                <label className="imageBox">
                  {/* <input type="file" accept="image/*" id="bookImage" onChange={this.imageDataChange}/> */}
                  <input type="file" accept="image/*" id="bookImage" name="image" onChange={this.imageDataChange} />
                  <img src={uploadIcon} id="imageIcon"/>
                  {this.state.imageData ? <img src={this.state.imageData} className="previewImage" /> : ""}
                </label>
                <div className="otherInfoBox">
                  <div className="otherInfoBox__box">
                    <p>タイトル</p>
                    {/* <input type="text"/> */}
                    <Field type="text" component="input" name="title" required/>
                  </div>
                  <hr/>
                  <div className="otherInfoBox__box">
                    <p>作者</p>
                    {/* <input type="text"/> */}
                    <Field type="text" component="input" name="author" required/>
                  </div>
                  <hr/>
                  <div className="otherInfoBox__box">
                    <p>タイプ</p>
                    <div className="otherInfoBox__box__label">
                      <Field className="bookType" component="select" name="type" required>
                        <option></option>
                        <option>紙</option>
                        <option>電子</option>
                      </Field>
                      <FontAwesomeIcon icon={faChevronDown} className="selectIcon"/>
                    </div>
                  </div>
                  <hr/>
                  <div className="otherInfoBox__box">
                    <p>おすすめ度</p>
                      {/* {reviewPoint()}
                      <FontAwesomeIcon icon={faChevronDown} className="selectIcon"/> */}
                    <div className="reviewPointBox">
                      <ReactStarsRating onChange={this.onChange} value={reviewPoint} className="reviewPoint" required/>
                      <div className="reviewPointText">{reviewPoint}</div>
                    </div>

                  </div>
                  <hr/>

                  <div className="otherInfoBox__box review"> 
                    <p>自己レビュー</p>
                    <Field className="reviewTextArea" component="textarea" name="reviewSentence"></Field>
                  </div>
                </div>
              </div>
              <button className="submitBtn" type="submit" disabled={pristine || submitting || invalid}>登録</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    )
  }
}
const mapDispatchToProps = ({ postBookReg })
const mapStateToProps = state => ({loginUserId: state.auth.id})

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({form:"bookRegForm"})(BookRegistration));