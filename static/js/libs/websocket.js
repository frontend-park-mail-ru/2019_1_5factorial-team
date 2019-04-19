export default class Ws {
	constructor() {
		if (Ws.__instance) {
			return Ws.__instance;
		}
		console.log('nside', this);

		// const address = `${window.location.protocol.replace('http', 'ws')}//78.155.207.69:5051/api/game/ws`;
		const address = 'ws://78.155.207.69:5051/api/game/ws';
		this.webs = new WebSocket(address);

		this.webs.onopen = () => {
			console.log(`WebSocket on address ${address} opened`);
			console.dir(this.webs);

			this.webs.onclose = () => {
				console.log(`WebSocket closed`);
			};

			this.webs.onmessage = this.handleMessage.bind(this);
		};

		Ws.__instance = this;
	}

	closeConn() {
		debugger;
		this.webs.close();
	}

	handleMessage(event) {
		if (event === undefined) {
			return;
		}
		console.log(event);
		const messageText = event.data;

		try {
			const message = JSON.parse(messageText);
			console.log(message);
			// bus.emit(message.type, message.payload);
			return {type: message.type, payload: message.payload};
		} catch (err) {
			console.error('smth went wront in handleMessage: ', err);
		}
	}

	send(type, pressed) {
		console.log('ws.send', JSON.stringify({type, pressed}))
		this.webs.send(JSON.stringify({type, pressed}));
	}
}
