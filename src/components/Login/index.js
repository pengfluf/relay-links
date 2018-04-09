import React from 'react';
import PropTypes from 'prop-types';

import { GC_USER_ID, GC_AUTH_TOKEN } from '../../constants';
import { handleChangeInput } from '../../utils';
import SignInUserMutation from '../../gql/mutations/SignInUserMutation';
import CreateUserMutation from '../../gql/mutations/CreateUserMutation';

import './style.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      login: true, // Login or SignUp? True, if the first one is correct.
      email: '',
      password: '',
      name: '',
    };

    this.setState = this.setState.bind(this);
    this.confirm = this.confirm.bind(this);
    this.confirmOnEnter = this.confirmOnEnter.bind(this);
    this.switchUI = this.switchUI.bind(this);
  }

  confirm() {
    const {
      login,
      name,
      email,
      password,
    } = this.state;

    if (login) {
      SignInUserMutation(
        email,
        password,
        (id, token) => {
          this.saveUserData(id, token);
          this.props.history.push('/');
        }
      );
    } else {
      CreateUserMutation(
        name,
        email,
        password,
        (id, token) => {
          this.saveUserData(id, token);
          this.props.history.push('/');
        }
      );
    }
  }

  confirmOnEnter(keyCode) {
    if (keyCode === 13) {
      this.confirm();
    }
  }

  saveUserData(id, token) {
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
  }

  switchUI() {
    this.setState((prevState) => ({
      login: !prevState.login,
    }));
  }

  render() {
    const {
      login,
      email,
      password,
      name,
    } = this.state;
    return (
      <div className="login">
        <h2 className="section-title">
          {login ? 'Login' : 'SignUp'}
        </h2>

        <div className="login__content">
          <div className="login__fields">
            {
              !login && (
                <input
                  className="login__field"
                  value={name}
                  onKeyUp={(e) => this.confirmOnEnter(e.keyCode)}
                  onChange={(e) =>
                    handleChangeInput('name', e.target.value, this.setState)}
                  type="text"
                  placeholder="Name"
                />
              )
            }
            <input
              className="login__field"
              value={email}
              onKeyUp={(e) => this.confirmOnEnter(e.keyCode)}
              onChange={(e) =>
                handleChangeInput('email', e.target.value, this.setState)}
              type="text"
              placeholder={
                login ? 'test@test.com' : 'Email'
              }
            />
            <input
              className="login__field"
              value={password}
              onKeyUp={(e) => this.confirmOnEnter(e.keyCode)}
              onChange={(e) =>
                handleChangeInput('password', e.target.value, this.setState)}
              type="password"
              placeholder={
                login ? '123456' : 'Password'
              }
            />
          </div>

          <div className="login__buttons">
            <button
              className="btn btn--login"
              onClick={this.confirm}
            >
              {login ? 'login' : 'create account'}
            </button>
            <button
              className="login__changeui"
              onClick={this.switchUI}
            >
              {
                login ?
                  'I don\'t have an account' :
                  'I already have an account'
              }
            </button>
          </div>
        </div>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default Login;
