const Command = require("../command.js");
const errors = require("../errors.js");
module.exports = context => {
	context.commands.push(new Command({
		name: "guilds",
		desc: "View all guilds you're in",
		run: async args => {
            if (context.client == null) {
				errors.notLoggedIn();
				return;
			}
			if(context.client.guilds.cache.size == 0) {
				errors.nullGuilds();
				return;
			}

            console.log("[Info] You are in " + context.client.guilds.cache.size + " guilds");
            console.log("[Info] Guilds you are in: \n" + context.client.guilds.cache.map(x => "\n" + x.name));
		}
	}));
};