import React from 'react';
import { Divider, Form, Button } from 'semantic-ui-react';

export default class Chatboy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chatMode: false,
			messages: [],
			currentMessage: '',
		};
		this.welcomeMessage =
			"Hello, I'm Chatboy! You are welcome to vent to me about issues in your life. Click on me to chat!";
	}

	chat = () => {
		return (
			<div className="chat">
				{this.messages()}
				<Form.Input
					className="chat-input"
					size="mini"
					value={this.state.currentMessage}
					placeholder="Send with enter."
					type="text"
					onChange={e => {
						this.setState({ currentMessage: e.target.value });
					}}
					onKeyPress={e => {
						if (e.key === 'Enter' && this.state.currentMessage !== '') {
							let messages = this.state.messages.slice();
							messages.push(this.state.currentMessage);
							this.setState({
								messages: messages,
								currentMessage: '',
							});
						}
					}}
				/>
			</div>
		);
	};

	messages = () => {
		let messages = this.state.messages.slice();
		return (
			<div className="messages">
				{messages.map((message, index) => (
					<div key={'message-' + index}>
						<div>{message}</div>
						<div>{index !== this.state.messages.length - 1 ? <Divider fitted={true} /> : null}</div>
					</div>
				))}
			</div>
		);
	};

	render() {
		return (
			<div className="chatboy">
				<div className="chat-bubble">
					<div className="text">{this.state.chatMode ? this.chat() : this.welcomeMessage}</div>
					<div className="tip" />
				</div>
				<img
					src="http://www.toughfurniture.com/wp-content/uploads/2016/04/orange_foam_cylinder_1.png"
					onClick={() => {
						this.setState({ chatMode: true });
					}}
				/>
			</div>
		);
	}
}
