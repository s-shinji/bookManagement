import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Auth extends Component {
  render() {
    return(
      this.props.loginUserId != 0 ? this.props.children : <Redirect to={'/login'} />
    )
  }
}
const mapStateToProps = state => ({loginUserId: state.auth.id})
export default connect(mapStateToProps, null)(Auth);