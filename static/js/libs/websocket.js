define('Ws', function (require) {
	// const bus = require('bus');

	class Ws {
		constructor() {
			if (Ws.__instance) {
				return Ws.__instance;
			}
			console.log('nside', this);

			// const address = `${window.location.protocol.replace('http', 'ws')}//78.155.207.69:5051/api/game/ws`;
			const address = 'ws://78.155.207.69:5051/api/game/ws';
			this.ws = new WebSocket(address);

			this.ws.onopen = () => {
				console.log(`WebSocket on address ${address} opened`);
				console.dir(this.ws);

				this.ws.onclose = () => {
					console.log(`WebSocket closed`);
				};

				this.ws.onmessage = this.handleMessage.bind(this);
			};

			Ws.__instance = this;
		}

		// close() {
		// 	this.ws.close();
		// }

		handleMessage(event) {
			const messageText = event.data;

			try {
				const message = JSON.parse(messageText);
				// bus.emit(message.type, message.payload);
			} catch (err) {
				console.error('smth went wront in handleMessage: ', err);
			}
		}

		send(type, pressed) {
			console.log('ws.send', JSON.stringify({type, pressed}))
			this.ws.send(JSON.stringify({type, pressed}));
		}
	}

	// Ws.host = window.location.host;

	return Ws;
});
