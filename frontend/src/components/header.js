import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postLogout } from '../actions';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  async logout (){
    await this.props.postLogout();
    await this.props.history.push('/login')
  }
  render() {
    return(
      <React.Fragment>
        {this.props.loginUserId == 0 ?
         <div className="header">
           <Link to="/login" className="header__link">ログイン</Link>
           <Link to="/register" className="header__link">新規登録</Link>
         </div> 
         : 
         <div className="header">
           <button onClick={this.logout} className="header__link">ログアウト</button>
         </div>
        }
      </React.Fragment>

    )
  }
}
const mapDispatchToProps = ({postLogout})
const mapStateToProps = state => ({loginUserId: state.auth.id})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));