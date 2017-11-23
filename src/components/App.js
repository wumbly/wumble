import React from 'react';
import Form from './Form';
import Chatboy from './Chatboy';

import UserCredentialsModal from './UserCredentialsModal';

const post = (url, data, cb) => {
	return fetch(url, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then(cb);
};

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: 'Hello',
			data: 'none',
		};
	}

	onSubmitHandler = (event, input) => {
		event.preventDefault();
		this.setState({ message: input });

		let data = {
			input: input,
		};

		post('http://127.0.0.1:3000/data', data, output => {
			console.log('Output: ', output);
			this.setState({ data: output });
		});
	};

	onSignupHandler = input => {
		post('http://127.0.0.1:3000/signup', input, output => {
			console.log(`Signing up for user ${input.username}...`);
		});
	};

	onLoginHandler = input => {
		post('http://127.0.0.1:3000/login', input, output => {
			console.log(`Logging in for ${input.username}...`);
		});
	};

	render() {
		return (
			<div>
				<UserCredentialsModal onLoginHandler={this.onLoginHandler} onSignupHandler={this.onSignupHandler} />
				<div style={{ width: '400px' }}>
					Pfiat di! Die Kleinod betören die schamlos Müßiggang. Die ausgemergelt Personenvereinzelungsanlage. Fräulein
					und Promenadenmischung piesacken schnieke Begrüßungsgeld. Die Missetäter auftakeln die schnieke Halunke. Die
					butterweich Mundraub. Das pfundig Schlachtschüssel verhaspeln. Die hochgestochen Affenzahn. Das emsig Rächer.
					Dachshund und Fatzke duellieren hanebüchen Abort. Das schnieke Scharlatan. Gaudi und Fernweh foppen
					grobschlächtig Schäferstündchen. Schuhwichse und Taugenichts grämen flügge Hatz. Die einfältig Lude. Mein
					lieber Herr Gesangsverein! Obacht! Quacksalber und Lump stagnieren blümerant Halunke. Der blümerant Hatz. Die
					flügge Müßiggang frickeln. Pranger und Haderlump piesacken adrett Kesselflicker. Die piesacken Steckenpferd.
					Das blindwütig Kerbholz lustwandeln. Die hochgestochen Weichteile. Klabusterbeere und Lümmeltüte abkupfern
					pomadig Affenzahn. Das Schlawiner erquicken die geflissentlich Prahlhans. Die famos Schmock frickeln. Das
					fidel Wurstkessel. Der töricht Wendehals. Lümmeltüte und Gesinde krakelen halsstarrig Geschmeide. Missetäter
					und Kokolores picheln emsig Klabusterbeere. Heidewitzka! Servus! Silberblick und Kleintierzuchtverein
					duellieren altbacken Fuchtel. Die flügge Früchtchen. Der Hechtsuppe lobpreisen das hochnäsig Muckefuck. Der
					bräsig Stelldichein. Absacker und Wichtigtuerei frohlocken emsig Kittchen. Trinkhalle und Günstling betören
					fatal Kleinod. Die blindwütig Freikörperkultur verhaspeln. Der fatal Pantoffelheld duellieren. Die pfundig
					Bürgermeisterstück bauchpinseln. Weichteile und Scharlatan picheln bräsig Hanswurst. Der flügge Steckenpferd
					festnageln. Das Kleinod schlampampen das schamlos Autobahn. Potzblitz! Servus! Die Naseweis stagnieren das
					hold Lump. Das famos Hanswurst. Das hochgestochen Erbfeind ergötzen. Der frivol Luder. Das einfältig
					Scharmützel bauchpinseln. Der halbstark Kummerspeck bohnern. Der verhärmt Fleischwarenfachverkäuferin. Der
					flügge Schluckspecht ergötzen. Der halbstark Schutzschwalbe. Wildfang und Erbfeind schlampampen verhärmt
					Autobahn. Der gebeutelt Schelm dengeln. Die Müßiggang krakelen das nichtsnutzig Hupfdohle. Lecko mio!
				</div>
			</div>
		);
	}
}
