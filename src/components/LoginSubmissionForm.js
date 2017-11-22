import React from 'react';
import { Button, Form } from 'semantic-ui-react';

export default class LoginSubmissionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		};
	}

	render() {
		return (
			<div className="login-form">
				Username:
				<Form.Input
					className="credentials-form-input"
					type="text"
					value={this.state.username}
					onChange={e => {
						this.setState({ username: e.target.value });
					}}
				/>
				Password:
				<Form.Input
					className="credentials-form-input"
					type="password"
					value={this.state.password}
					onChange={e => {
						this.setState({ password: e.target.value });
					}}
				/>
				<Button
					className="credentials-button"
					onClick={() => {
						let credentials = {
							username: this.state.username,
							password: this.state.password,
						};
						this.props.onLoginHandler(credentials);
						this.setState({ username: '', password: '' });
					}}
				>
					Log In
				</Button>
			</div>
		);
	}
}
