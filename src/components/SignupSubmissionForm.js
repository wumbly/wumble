import React from 'react';

export default class SignupSubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <div className="signup-form">
        <input
          name="username"
          type="text"
          onChange={e => {
            this.setState({ username: e.target.value });
          }}
        />
        <input
          name="password"
          type="password"
          onChange={e => {
            this.setState({ password: e.target.value });
          }}
        />
        <button
          onClick={() => {
            let credentials = {
              username: this.state.username,
              password: this.state.password
            }
            this.props.onSignupHandler(credentials);
          }}
        >
          Sign Up
        </button>
      </div>
    );
  }
}
