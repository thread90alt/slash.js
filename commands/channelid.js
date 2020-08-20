const Command = require("../command.js");
const errors = require("../errors.js");
module.exports = context => {
	context.commands.push(new Command({
		name: "channelid",
		aliases: ["cid"],
		desc: "Selects a channel by its id.",
		run: async args => {
			if (args.length != 1) {
				errors.invalidArguments();
				return;
			}
			if (context.client == null) {
				errors.notLoggedIn();
				return;
			}
			
			const channel = context.client.channels.cache.get(args[0]);
			if (!channel) {
				errors.channelNotFound();
			} else {
				context.channel = channel;
				errors.foundChannel();
			}
		}
	}));
};