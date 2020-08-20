const http = require("http");
const express = require("express");
const SocketIO = require("socket.io");
const port = 5000 || process.env.port;

module.exports = context => {
	console.log();
	const app = express();
	app.use(express.static("web"));
	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname + "/web/index.html"));
	});
	const server = app.listen(port, () => console.log("Server is listening on port " + port + "."));
	const io = SocketIO.listen(server);
	context.client.on("message", msg => {
		if (context.channel == null || context.channel.id != msg.channel.id) {
			return;
		}
		io.emit("message", {
			author: msg.author.username,
			text: msg.content
		});
	});
	function handle(socket) {
		socket.on("disconnect", () => {

		});
		socket.on("command", text => {
			context.run(text);
		});
		const emitData = () => {
			if (context.client == null || context.client.user == null) return;
			socket.emit("data", {
				client: {
					name: context.client.user.username,
					tag: context.client.user.discriminator,
					id: context.client.user.id,
					status: context.client.presence.status
				}
			});
		};
		setInterval(emitData, 1000 / 60);
	}
	io.on("connection", socket => handle(socket));
};