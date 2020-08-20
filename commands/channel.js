const Command = require("../command.js");
const errors = require("../errors.js");
module.exports = context => {
	context.commands.push(new Command({
		name: "channel",
		aliases: ["c", "ch"],
		desc: "Selects a channel in the current guild by its name.",
		run: async args => {
			if (args.length != 1) {
				errors.invalidArguments();
				return;
			}
			if (context.client == null) {
				errors.notLoggedIn();
				return;
			}
			if (context.guild == null) {
				errors.notInGuild();
				return;
			}
			const channel = context.guild.channels.cache.find(g => g.name == args[0]);
			if (!channel) {
				errors.channelNotFound();
			} else {
				context.channel = channel;
				errors.foundChannel();
			}
		}
	}));
};