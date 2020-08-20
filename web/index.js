const socket = io();
const errors = require("../errors");
const topbar = document.getElementById("top-bar");
const chat = document.getElementById("chat");
const chatInput = document.getElementById("chat-input");
const chatButton = document.getElementById("chat-button");
const leftPanel = document.getElementById("left-panel");
const rightPanel = document.getElementById("right-panel");

function chatSend() {
	var value = chatInput.value.trim();
	if (value == "") {
		return;
	}
	value = value.replace(/\\/g, "\\\\");
	value = value.replace(/\"/g, "\\\"");
	chatInput.value = "";
	socket.emit("command", `send "${value}"`);
}

chatInput.addEventListener("keyup", event => {
	if (event.keyCode == 13 && chatInput == document.activeElement) {
		event.preventDefault();
		chatButton.click();
	}
});

socket.on("message", data => {
	const {author, text} = data;
	chat.innerHTML += (chat.innerHTML.length ? "<br>" : "") + "[" + author + "]: " + text;
});

socket.on("data", data => {
	let statusColor;
	switch(data.client.status) {
		case "online":
			statusColor = "lime";
			break;
		case "offline":
			statusColor = "gray";
			break;
		case "dnd":
			statusColor = "red";
			break;
		case "idle":
			statusColor = "yellow";
			break;
		default:
			statusColor = "white";
			break;
	}
	const html = `
		${data.client.name}#${data.client.tag} [<font color="${statusColor}">${data.client.status}</font>]
	`;
	if (topbar.innerHTML != html) {
		topbar.innerHTML = html;
	}
});
socket.on("connect", () => {
	//setTimeout(() => socket.emit('command', prompt()), 1000)
});