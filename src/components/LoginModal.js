import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

import LoginSubmissionForm from './LoginSubmissionForm';
import SignupSubmissionForm from './SignupSubmissionForm';

const LoginModal = props => (
	<Modal trigger={<Button>Show Modal</Button>}>
		<Modal.Header>Select a photo</Modal.Header>
		<Modal.Content image>
			<Image wrapped size="medium" src="https://placekitten.com/200/300" />
			<Modal.Description>
				<Header>Default Profile Image</Header>
				<p>Hello there!!!</p>
			</Modal.Description>
		</Modal.Content>
	</Modal>
);

export default LoginModal;
