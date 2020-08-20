const Command = require("../command.js");
const errors = require("../errors.js");
const Botcord = require("discord.js");
const Usercord = require("discord.js-selfbot");

module.exports = context => {
	context.commands.push(new Command({
		name: "login",
		run: async args => {
            if (args.length != 2) {
				errors.argsLogin();
				return;
			}
			const token = args[1];
			if (args[0] == "bot") {
				if (context.client != null) context.client.destroy();
				context.client = new Botcord.Client;
				context.setupEvents();
				context.client.login(token).then(() => {
					errors.successfulLogin();
				}).catch(() => {
					errors.invalidLogin();
				});
				context.config.set("type", args[0]);
				context.config.set("token", args[1]);
			} else if (args[0] == "user") {
				if (context.client != null) context.client.destroy();
				context.client = new Usercord.Client;
				context.setupEvents();
				context.client.login(token).then(() => {
					errors.successfulLogin();
				}).catch(() => {
					errors.invalidLogin();
				});
				context.config.set("type", args[0]);
				context.config.set("token", args[1]);
			} else {
				errors.unknownLogin();
			}
		}
	}));
};