import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { postUserIcon } from '../actions';
import Header from './header';

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageData: null
    }
    this.handleImageData = this.handleImageData.bind(this)
    this.renderIcon = this.renderIcon.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleImageData(e) {
    const files = e.target.files

    if (files.length > 0) {
      let file = files[0]
      let reader = new FileReader()
      reader.onload = (e) => {
        this.setState({ imageData: e.target.result })
      }
      reader.readAsDataURL(file)
    } else {
      this.setState({ imageData: null })
    }

  }
  renderIcon() {
    if (this.state.imageData) {
      return (
        <label htmlFor="userIcon" className="iconLabel">
          <img src={this.state.imageData} className="previewIcon" />
          <input type="file" accept="image/*" id="userIcon" name="userIcon" onChange={this.handleImageData} />
        </label>
      )
    } else if (this.props.book.userIcon) {
      return (
        <label htmlFor="userIcon" className="iconLabel">
          {/* {this.props.book.userIcon == "default.jpeg" ?
            <img src={`${process.env.PUBLIC_URL}/images/${this.props.book.userIcon}`} className="previewIcon"/> 
          :   */}
          <img src={this.props.book.userIcon} className="previewIcon" />
          {/* } */}
          <input type="file" accept="image/*" id="userIcon" name="userIcon" onChange={this.handleImageData} />
        </label>
      )
    } else {
      return (
        <label htmlFor="userIcon" className="iconLabel iconPad">
          <input type="file" accept="image/*" id="userIcon" name="userIcon" onChange={this.handleImageData} />
          <FontAwesomeIcon icon={faCamera} id="cameraIcon" />
        </label>
      )
    }
  }
  async onSubmit(e) {
    e.preventDefault()
    let userInfo = {}
    if (document.getElementById("userIcon").files[0]) {
      userInfo.userId = this.props.book.userId
      userInfo.userIcon = document.getElementById("userIcon").files[0]
      await this.props.postUserIcon(userInfo)
      await this.props.history.push(`/user/${this.props.book.userId}/book/${this.props.book.id}`)
    } else {
      await this.props.history.push(`/user/${this.props.book.userId}/book/${this.props.book.id}`)
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <form className="editUserForm" encType="multipart/form-data" onSubmit={this.onSubmit}>
          <p>{this.props.book.name}</p>
          <div>
            {this.renderIcon()}
          </div>
          <button>更新</button>
        </form>
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => ({ book: state.book.bookDetail.bookDetail })
const mapDispatchStateToProps = ({ postUserIcon })

export default connect(mapStateToProps, mapDispatchStateToProps)(User);
