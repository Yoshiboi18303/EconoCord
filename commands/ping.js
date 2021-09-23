var { MessageEmbed } = require('discord.js');

module.exports.help = {
	name: "ping",
	description: "Gets the speed of the connection to Discord."
}

module.exports.config = {
	cooldown: ms("10s"),
	message: `Is the bot not fast enough for you? (Try again in %t)`
}

module.exports.run = async (bot, cmd, args) => {
	// console.log(cmd)
	var client = bot;

	var ping = Math.floor(bot.ws.ping);

	var em = new MessageEmbed()
	.setAuthor(`Ping`, cmd.user.avatarURL())
	.setDescription(`PONG! My ping is **${ping}ms**.`)
	.setTimestamp()
	.setColor("GREEN")

	cmd.reply({ embeds: [em] })	

}