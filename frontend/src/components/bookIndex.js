import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { readBooks } from '../actions';
import _ from 'lodash';
import Header from './header';

class BookIndex extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const urlPath = this.props.location.pathname
    const userId = urlPath.replace(/[^0-9]/g, '')
    this.props.readBooks(userId)
  }

  render() {
    const floatButtonStyle = { position: "fixed", bottom: "20px", right: "20px" }
    const handleBooks = _.map(this.props.books, (value, key) => {
      return (
        <Link to={`/user/${value.userId}/book/${value.id}`}>
          {value.image == "noImage.jpg" ?
            <img src={`${process.env.PUBLIC_URL}/images/${value.image}`} className="bookIndexImage" />
            :
            <img src={value.image} className="bookIndexImage" />
          }
        </Link>
      )
    })
    return (
      <React.Fragment>
        <Header />
        <div className="bookIndex">
          <Link to="/registerBook">
            <Fab color="primary" style={floatButtonStyle}>
              <AddCircle />
            </Fab>
          </Link>
          {handleBooks}
        </div>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => ({ books: state.book.books })
const mapDispatchToProps = ({ readBooks })
export default connect(mapStateToProps, mapDispatchToProps)(BookIndex);
