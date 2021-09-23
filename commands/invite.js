const { MessageEmbed } = require('discord.js');

module.exports.help = {
  name: 'invite',
  description: 'Run this to invite EconoCord to your server!'
}

module.exports.config = {
	cooldown: 0,
	message: ``
}

module.exports.run = (bot, cmd, args) => {
  var client = bot;

  const invite_link = client.generateInvite({
    scopes: [
      'applications.commands',
      'bot'
    ],
    permissions: [
      'CHANGE_NICKNAME',
      'VIEW_CHANNEL',
      'SEND_MESSAGES',
      'EMBED_LINKS',
      'ATTACH_FILES',
      'READ_MESSAGE_HISTORY',
      'MENTION_EVERYONE',
      'USE_EXTERNAL_EMOJIS'
    ]
  })

  const embed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle("Invite " + client.user.username)
    .setDescription(`Click [this](${invite_link}) to invite me!`)
  cmd.reply({
    embeds: [
      embed
    ]
  })
}