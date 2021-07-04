import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import Header from './header';
import { readUser } from '../actions'
import BookIcon from '../images/icons8(本棚).png';
import TopIcon from '../images/logo_line.png';

class Home extends Component {
      constructor(props) {
        super(props)
      }

    componentDidMount() {
        this.props.readUser()
    }
    render() {
        const allUserInfo = this.props.allUserInfo
        const loginUserId = this.props.loginUserId

        const handleUser = _.map(allUserInfo,(user) => {
            return(
                <div className="homeContents__box__user">
                    <p className="userName">{user.name}</p>
                    <Link to={`/user/${user.id}/books`}><img src={BookIcon} className="bookIcon" alt=""/></Link>
                </div>
            )
        })

        return(
            <React.Fragment>
                <Header />
                <div className="homeContainer">
                    <img src={TopIcon} className="companyIcon" alt=""/>
                    <div className="homeContents">
                        <div className="homeContents__box">
                            {handleUser}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({ loginUserId: state.auth.id, allUserInfo: state.user })
const mapDispatchToProps = ({ readUser })
export default connect(mapStateToProps, mapDispatchToProps)(Home);