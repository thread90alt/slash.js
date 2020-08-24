const Command = require("../command.js");
const errors = require("../errors.js");
module.exports = context => {
	context.commands.push(new Command({
		name: "membercount",
		desc: "View all channels the guild has",
    aliases: ["mc", "memcount"],
		run: async args => {
      if (context.client == null) {
				errors.notLoggedIn();
				return;
      }
      
      if (context.guild == null) {
				errors.notInGuild();
	    	return;
      }
			
      console.log("[Info] Channels this guild has: \n" + context.guild.memberCount();
    }
   }));
};
