import React from 'react';
import Form from './Form.js';
import LoginSubmissionForm from './LoginSubmissionForm';
import SignupSubmissionForm from './SignupSubmissionForm';

import $ from 'jquery';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Hello',
      data: 'none'
    };
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onSignupHandler = this.onSignupHandler.bind(this);
    this.onLoginHandler = this.onLoginHandler.bind(this);
    
  }

  onSubmitHandler(event, input) {
    event.preventDefault();
    this.setState({message: input});

    let data = {
      input: input
    }

    $.post('http://127.0.0.1:3000/data', data, (output) => {
      console.log('Output: ', output);
      this.setState({data: output});
    });
  }

  onSignupHandler(input) {
    $.post('http://127.0.0.1:3000/signup', input, (output) => {
      console.log(`Signing up for user ${input.username}...`);
    });
  }

  onLoginHandler(input) {
    $.post('http://127.0.0.1:3000/login', input, (output) => {
      console.log(`Logging in for ${input.username}...`);
    });
  }

  render() {
    return (
      <div>
        Login: <LoginSubmissionForm onLoginHandler={this.onLoginHandler}/>
        Signup: <SignupSubmissionForm onSignupHandler={this.onSignupHandler}/>
        {/* <Form onSubmitHandler={this.onSubmitHandler} /> */}
      </div>
    );
  }
}
