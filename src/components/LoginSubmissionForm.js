import React from 'react';

export default class LoginSubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <div className="login-form">
        <input
          name="username"
          type="text"
          value={this.state.username}
          onChange={e => {
            this.setState({ username: e.target.value });
          }}
        />
        <input
          name="password"
          type="password"
          value={this.state.password}
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
            this.props.onLoginHandler(credentials);
            this.setState({username: '', password: ''});
          }}
        >
          Log In
        </button>
      </div>
    );
  }
}
