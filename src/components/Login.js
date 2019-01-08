import React, { Component } from "react";
import { AUTH_TOKEN } from "../constants";

class Login extends Component {
  state = {
    // Swtich between Login and Signup
    login: true,
    email: "",
    password: "",
    name: ""
  };

  _confirm = async () => {
    // TODO
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  render() {
    const { login, email, password, name } = this.state;
    return (
      <div>
        <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              type="text"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              placeholder="Your name"
            />
          )}
          <input
            type="text"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            placeholder="Your email address"
          />
          <input
            type="text"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          <div className="pointer mr2 button" onClick={() => this._confirm()}>
            {login ? "login" : "create account"}
          </div>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
