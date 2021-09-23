const { MessageEmbed } = require('discord.js');
const Users = require('../models/User');

module.exports.help = {
  name: "profile",
  description: "Check your (or another users) profile balance and more!",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user to lookup (default is you)",
      required: false
    }
  ]
}

module.exports.config = {
	cooldown: ms(`10s`),
	message: `Wow, someone's self-important.`
}

module.exports.run = async (bot, cmd, args) => {
  // cmd.reply("Coming soon!")
	var user = args[0]
}