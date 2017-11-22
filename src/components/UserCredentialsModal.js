import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import LoginSubmissionForm from './LoginSubmissionForm';
import SignupSubmissionForm from './SignupSubmissionForm';

export default class UserCredentialsModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			view: 'login',
		};
	}

	login = () => {
		return (
			<Modal trigger={<Button>Log In</Button>}>
				<Modal.Header>Log in</Modal.Header>
				<Modal.Content image>
					<Image
						wrapped
						size="medium"
						src="https://thumbs.dreamstime.com/z/bullying-group-kids-classmate-isolated-white-63520042.jpg"
					/>
					<Modal.Description>
						<Header>Log in here</Header>
						Login: <LoginSubmissionForm onLoginHandler={this.props.onLoginHandler} />
						Not signed up yet?{' '}
						<a
							onClick={() => {
								this.setState({ view: 'signup' });
							}}
						>
							Click here to sign up.
						</a>
					</Modal.Description>
				</Modal.Content>
			</Modal>
		);
	};

	signup = () => {
		return (
			<Modal trigger={<Button>Sign Up</Button>}>
				<Modal.Header>Sign Up</Modal.Header>
				<Modal.Content image>
					<Image
						wrapped
						size="medium"
						src="https://i.pinimg.com/originals/76/4e/50/764e501b90c004aa849ce31e9e18ca80.jpg"
					/>
					<Modal.Description>
						<Header>Sign up here</Header>
						Signup: <SignupSubmissionForm onSignupHandler={this.props.onSignupHandler} />
						Signed up already?{' '}
						<a
							onClick={() => {
								this.setState({ view: 'login' });
							}}
						>
							Click here to log in.
						</a>
					</Modal.Description>
				</Modal.Content>
			</Modal>
		);
	};

	render() {
		return (
			<div className="user-credentials-modal">
				{this.state.view === 'login' ? this.login() : this.state.view === 'signup' ? this.signup() : null}
			</div>
		);
	}
}
