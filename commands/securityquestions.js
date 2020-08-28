const Command = require("../command.js");
const errors = require("../errors.js");
const colors = require("colors");
module.exports = context => {
	context.commands.push(new Command({
		name: "security",
		desc: "Enable or disable security questions. Usage: 'security \"Question\" \"Answer\"'",
		run: async args => {
      if(context.security == false) {
        console.log("[Console]" + colors.green("Successfully enabled security!"));
			  context.security = true;
        context.secQuestion = args[0];
        context.secAnswer = args[1];
      }
		}
	}));
};
