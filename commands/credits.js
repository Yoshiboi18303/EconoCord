const { MessageEmbed } = require('discord.js');

module.exports.help = {
  name: 'credits',
  description: 'Shows the credits of who made EconoCord in an embed!'
}

module.exports.config = {
	cooldown: ms("5s"),
	message: "Please wait %s to use this command."
}

module.exports.run = async (bot, cmd, args) => {
  var client = bot;

  const owner = client.users.fetch("697414293712273408")
  const co_owner = client.users.fetch("242734840829575169")

  console.log(owner, co_owner)

  const credits_embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(client.user.username + " Credits")
    .addFields([
      {
        name: 'Owner',
        value: `${owner.username}`
      },
      {
        name: 'Co Owner',
        value: `${co_owner.username}`
      }
    ])
  cmd.reply({
    embeds: [
      credits_embed
    ]
  })
}