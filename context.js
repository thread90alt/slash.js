const Botcord = require("discord.js");
const Usercord = require("discord.js-selfbot");
const errors = require("./errors.js");
const colors = require("colors");
const params = require("./params.js");

module.exports = class Context {
	constructor(config) {
		config.create("type", null);
		config.create("token", null);
		config.create("guild", null);
		config.create("listening", true);
		config.create("security-enabled", false);
		config.create("security-question", null);
		config.create("security-answer", null);
		const type = config.get("type");
		const token = config.get("token");
		this.config = config;
		this.client = null;
		this.guild = null;
		this.security = false;
		this.secQuestion = null;
		this.secAnswer = null;
		this.commands = [];
		if (["bot", "user"].indexOf(type) != -1 && token != null) {
			if (type == "bot") {
				this.client = new Botcord.Client;
				this.setupEvents();
				this.client.login(token).then(() => {
					errors.successfulLogin();
				}).catch(() => {
					errors.invalidLogin();
				});
			} else if (type == "user") {
				this.client = new Usercord.Client;
				this.setupEvents();
				this.client.login(token).then(() => {
					errors.successfulLogin();
				}).catch(() => {
					errors.invalidLogin();
				});
			}
		} else if (token != null) {
			errors.unknownLogin();
		}
	}
	setupEvents() {
		this.client.on("message", msg => {
			if(msg.author.id == this.client.user.id) return;
			if (
				this.channel != null &&
				msg.channel.id == this.channel.id &&
				this.config.get("listening")
			) {
				var text = msg.content;

				// formatting
				text = text.replace(/\*\*(.*?)\*\*/g, (match, text) => {
					return colors.bold(text);
				});
				text = text.replace(/\*(.*?)\*/g, (match, text) => {
					return colors.italic(text);
				});
				text = text.replace(/\_\_(.*?)\_\_/g, (match, text) => {
					return colors.underline(text);
				});
				text = text.replace(/\_(.*?)\_/g, (match, text) => {
					return colors.italic(text);
				});
				text = text.replace(/\~\~(.*?)\~\~/g, (match, text) => {
					return colors.strikethrough(text);
				});

				// log messages
				console.log(
					colors.bold.red("[" + colors.cyan(msg.author.username) + "]: ") + text
				);
			}
		});
	}
	async handle(cmd, args) {
		var found = false;
		this.commands.forEach(async command => {
			if (command.name.toLowerCase() == cmd.toLowerCase()) {
				found = true;
				await command.run(args);
			}
		});
		if (!found) {
			this.commands.forEach(async command => {
				command.aliases.forEach(async alias => {
					if (alias.toLowerCase() == cmd.toLowerCase()) {
						found = true;
						await command.run(args);
					}
				});
			});
		}
		if (!found) {
			errors.unknownCommand();
		}
	}
	async execute(items) {
		if (items.length != 0) {
			return await this.handle(items[0], items.slice(1));
		}
	}
	async run(text) {
		const items = params(text);
		return await this.execute(items);
	}
};
