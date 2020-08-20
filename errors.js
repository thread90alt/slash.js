function error(text) {
	console.error("[Error]: " + text)
}
function info(text) {
	console.log("[INFO]: " + text);
}
function argsLogin() {
	error("Usage: login [user/bot] [token]")
}
function unknownCommand() {
	error("Command not found.")
}
function invalidArguments() {
	error("Invalid argument length.")
}
function invalidLogin() {
	error("Could not login with that token.")
}
function successfulLogin() {
	info("Successfully logged in.")
}
function foundGuild() {
	info("Sucessfully selected guild.")
}
function foundChannel() {
	info("Sucessfully selected channel.")
}
function unknownLogin() {
	error("Unknown login type.")
}
function evalError() {
	error("Failed to run eval command.")
}
function guildNotFound() {
	error("Guild was not found.")
}
function notInGuild() {
	error("Guild has not been selected.")
}
function channelNotFound() {
	error("Channel was not found.")
}
function notLoggedIn() {
	error("Not logged in, please login.")
}
function notInChannel() {
	error("You are not in a channel.")
}
function emptyMessage() {
	error("Cannot send an empty message.")
}
function sentMessage(channelName) {
	info("Successfully sent message in " + channelName + ".")
}
function isListening(bool) {
	info(bool ? "Listening to the active channel's messages." : "No longer listening to the active channel's messages.")
}
function nullGuilds() {
	error("No guilds were found on cache.");
}

module.exports = {
	error, info, evalError,
	unknownCommand, invalidArguments,
	invalidLogin, successfulLogin, foundGuild,
	guildNotFound, notLoggedIn, unknownLogin,
	notInChannel, channelNotFound, notInGuild,
	foundChannel, emptyMessage, sentMessage,
	isListening, argsLogin, nullGuilds, 
};