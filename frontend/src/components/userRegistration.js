import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import {postUserReg} from '../actions';
import { connect } from 'react-redux';
import {maxLength,email} from '../validation';
import Header from './header';

class UserRegistration extends Component {
      constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
      }

      renderField = (field) => {
        const { input, type, id, className, placeholder, style , meta: {touched, error}} = field
        const errorStyle = {
          color:"red"
        }
        return(
          <React.Fragment>
            {touched && error && <p style={errorStyle}>{error}</p>}
            <input type={type}  {...input} id={id} className={className} placeholder={placeholder} style={style} />
          </React.Fragment>
        )
      }

      async onSubmit(values) {
        await this.props.postUserReg(values)
        if(this.props.userRegistration == 0) {
        await this.props.history.push('/result')
        }

      }


      render() {
        const style = {
          marginBottom: "10px"
        }
        const style2 = {
          color:"red"
        }
        const {handleSubmit,pristine, submitting, invalid} = this.props

        return(
          <React.Fragment>
            <Header />
            <form className="form-signin" action="Register" method="POST" onSubmit={handleSubmit(this.onSubmit)}>
              <h1 className="h3 mb-3 font-weight-normal">新規登録</h1>
              {this.props.userRegistration == 1 ?
                <p style={style2}>すでに登録済みのユーザー名です</p>
              : ""}
              {this.props.userRegistration == 2 ?
                <p style={style2}>すでに登録済みのメールアドレスです</p>
              : ""}
              {this.props.userRegistration == 3 ?
                <p style={style2}>パスワードが一致していません</p>
              : ""}
              <label htmlFor="inputName" className="sr-only">ユーザー名</label>
              <Field type="text" id="inputName" name="name" className="mb-10 form-control" placeholder="ユーザー名(15字以内)"
                style={style} component={this.renderField} />

              <label htmlFor="inputEmail" className="sr-only">Email</label>
              <Field type="text" id="inputEmail" name="email" className="mb-10 form-control" placeholder="Email"
                style={style} component={this.renderField} />


              <label htmlFor="inputPassword" className="sr-only">パスワード</label>
              <Field type="password" id="inputPassword"  name="password" className="mb-10 form-control"
                style={style} placeholder="パスワード" component={this.renderField} />

              <label htmlFor="inputPasswordConfirmation" className="sr-only">パスワード(確認用)</label>
              <Field type="password" id="inputPasswordConfirmation"  name="passwordConfirmation" className="mb-10 form-control"
                style={style} placeholder="パスワード(確認用)" component={this.renderField}/>

              <div className="checkbox mb-3">
              </div>
              <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={pristine || submitting || invalid }>登録</button>
              <p className="mt-5 mb-3 text-muted">&copy; 2020</p>

            </form>
          </React.Fragment>
        )
      }

}
const validate = values => {
  const errors = {}

  if(!values.name) errors.name = "ユーザー名を入力してください"
  if(values.name) errors.name =  maxLength(values.name, 15, '15文字以下で入力してください')
  if(!values.email) errors.email = "メールアドレスを入力してください"
  if(values.email) errors.email = email(values.email, 'メールアドレスが不正です')
  if(!values.password) errors.password = "パスワードを入力してください"
  if(!values.passwordConfirmation) errors.passwordConfirmation = "再度パスワードを入力してください"

  return errors
}
const mapStateToProps = state => ({userRegistration : state.userRegistration})
const mapDispatchToProps = ({postUserReg})
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({validate,form: 'userRegForm'})(UserRegistration));


