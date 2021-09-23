const { MessageEmbed } = require('discord.js');

module.exports.help = {
	name: "sendrules",
	description: "Sends the support server rules",
}

module.exports.run = async (bot, cmd, args) => {
  return console.log(client.guilds.cache.get('845750926836498463').name)
	const embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle(client.guilds.cache.get('845750926836498463').name + " Rules!")
    .setDescription(`Here are all the rules for ${client.guilds.cache.get('845750926836498463').name}!\n\n\`\`\`\nRule 1: You can not start any inappropriate coversations here!\n\`\`\``)
  return cmd.reply({
    embeds: [
      embed
    ]
  })
}