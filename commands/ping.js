var { MessageEmbed } = require('discord.js');

module.exports.help = {
	name: "ping",
	description: "Gets the speed of the connection to Discord."
}

module.exports.run = async (bot, cmd, args) => {
	// console.log(cmd)
	var client = bot;

	var ping = Math.floor(bot.ws.ping);

	var em = new MessageEmbed()
	.setAuthor(`Ping`, cmd.member.user.avatarURL())
	.setDescription(`PONG! My ping is **${ping}ms**.`)
	.setTimestamp()
	.setColor("GREEN")

	cmd.reply({ embeds: [em] })	

}