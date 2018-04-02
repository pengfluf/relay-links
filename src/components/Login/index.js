import React from 'react';

import { GC_USER_ID, GC_AUTH_TOKEN } from '../../constants';
import { handleChangeInput } from '../../utils';
import SignInUserMutation from '../../gql/mutations/SignInUserMutation';
import CreateUserMutation from '../../gql/mutations/CreateUserMutation';

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
    this.saveUserData = this.saveUserData.bind(this);
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
      <div>
        <h2>{login ? 'Login' : 'SignUp'}</h2>

        <div>
          {
            !login && (
              <input
                value={name}
                onChange={(e) =>
                  handleChangeInput('name', e.target.value, this.setState)}
                type="text"
                placeholder="Your name"
              />
            )
          }
          <input
            value={email}
            onChange={(e) =>
              handleChangeInput('email', e.target.value, this.setState)}
            type="text"
            placeholder="Your email address"
          />
          <input
            value={password}
            onChange={(e) =>
              handleChangeInput('password', e.target.value, this.setState)}
            type="password"
            placeholder="Your password"
          />
        </div>

        <div>
          <button
            onClick={this.confirm}
          >
            {login ? 'login' : 'create account'}
          </button>
          <button
            onClick={this.switchUI}
          >
            {
              login ?
                'need to create an account?' :
                'already have an account?'
            }
          </button>
        </div>

      </div>
    );
  }
}

export default Login;
