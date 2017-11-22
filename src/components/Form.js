import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ''
    };
  }

  render() {
    return (
      <div className="user-input">
        <textarea
          name="user-input-field"
          onChange={e => {
            this.setState({ userInput: e.target.value });
          }} />
        <button
          onClick={e => {
            this.props.onSubmitHandler(e, this.state.userInput);
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}
