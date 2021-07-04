import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm} from 'redux-form'

import { postLogin } from '../actions'

class Login extends Component{
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  async onSubmit(values) {
    await this.props.postLogin(values)
    if(this.props.loginUserId != 0) {
      await this.props.history.push('/')
    }
    if(this.props.loginUserId == 0) {
      document.getElementById("loginErrors").style.display = 'block'
    }
  }
  renderField(field) {
    const { input, type, id, className, placeholder, style ,meta:{touched,error}} = field
    const errorStyle = {
      color:"red"
    }

    return(
      <React.Fragment>
        {touched && error && <span style={errorStyle}>{error}</span>}
        {/* {...input}はname属性を展開している？ */}
        <input type={type}  {...input} id={id} className={className} placeholder={placeholder} style={style} />
      </React.Fragment>

    )

  }

  render() {
      const {handleSubmit,pristine, submitting, invalid} = this.props
      const style = {
        marginBottom: "10px"
      }
      const style2 = {
        color:"red",
        display:"none"
      }

      return(
        <React.Fragment>
          <form className="form-signin" onSubmit={handleSubmit(this.onSubmit)}>
            <h1 className="h3 mb-3 font-weight-normal" id="loginTitle">ログインしてください</h1>
            <span id="loginErrors" style={style2}>ユーザー名またはパスワードが違います</span>
            <label htmlFor="inputName" className="sr-only">ユーザー名</label>
            <Field type="text" id="inputName user" name="userName" className="form-control" placeholder="ユーザー名" style={style} component={this.renderField}/>

            <label htmlFor="inputPassword" className="sr-only">パスワード</label>
            <Field type="password" id="inputPassword password"  name="password" className="form-control" placeholder="パスワード" style={style}  component={this.renderField}/>
            <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={pristine || submitting || invalid}>ログイン</button>
            <Link to="/register"className="btn btn-lg btn-primary btn-block" type="submit">新規登録</Link>
            <p className="mt-5 mb-3 text-muted">&copy; 2021</p>

          </form>
        </React.Fragment>

      )
  }

}
const validate = values => {
  const errors = {}
  if(!values.userName) errors.userName = "ユーザー名を入力してください"
  if(!values.password) errors.password = "パスワードを入力してください"

  return errors
}
const mapStateToProps = state => ({loginUserId : state.auth.id})
const mapDispatchToProps = ({postLogin})
export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({validate, form: 'loginForm'})(Login));


