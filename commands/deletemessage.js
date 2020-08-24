const Command = require("../command.js");
const errors = require("../errors.js");
module.exports = context => {
	context.commands.push(new Command({
		name: "deletemessage",
		desc: "Delete a message by ID",
    aliases: ["delmsg"],
		run: async args => {
      if (context.client == null) {
				errors.notLoggedIn();
				return;
      }

      if (context.guild == null) {
				errors.notInGuild();
	    	return;
      }

      if(!context.client.hasPermission("DELETE_MESSAGES")) {
        errors.notEnoughPermissions();
        return;
      }

      if(!args[0]) {
        errors.invalidArguments();
        return;
      }

      const msgToDelete = context.channel.messages.fetch(args[0]);
      msgToDelete.delete();
    }
   }));
};
