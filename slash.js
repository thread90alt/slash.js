// NzIzMjQ1OTY0NjQyNzQ2NDM5.Xu5d4g.PB5NE2Y50hwQTvteN6KnXft6N0E

const readline = require("readline");
const Context = require("./context.js");
const errors = require("./errors.js");
const Config = require("./config.js");

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const context = new Context(new Config("./config.json"));

const commandList = [
	"help", "eval", "login", "guild", "channel",
	"send", "listen", "guildid", "channelid",
	"print", "guilds", "channels"
];
commandList.forEach(name => require("./commands/" + name + ".js")(context));

require("./website.js")(context);

const step = () => {
	rl.question("Slash > ", async text => {
		await context.run(text);
		step();
	});
};
step();