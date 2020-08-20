const Command = require("../command.js");
const errors = require("../errors.js");
module.exports = context => {
	context.commands.push(new Command({
		name: "help",
		aliases: ["?", "commands", "cmds", "h"],
		desc: "Shows a list of commands.",
		run: async args => {
			if (args.length != 0) {
				errors.invalidArguments();
				return;
			}
			const res = [];
			context.commands.forEach(command => {
				res.push(command.name + ": " + command.desc);
			});
			errors.info("SlashJS Commands\n" + res.join("\n"));
		}
	}));
};