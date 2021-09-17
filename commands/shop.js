const { MessageEmbed } = require('discord.js');
const Users = require('../models/User');

module.exports.help = {
  name: 'shop',
  description: 'Look at, buy, or sell from the shop of items on EconoCord!',
  options: [
    {
      type: 3,
      name: 'action',
      description: 'Choose what you want to do in the EconoCord Shop',
      required: true,
      choices: [
        {
          name: 'view',
          value: 'look'
        },
        {
          name: 'buy',
          value: 'buy'
        },
        {
          name: 'sell',
          value: 'sell'
        }
      ]
    }
  ]
}

module.exports.run = async (bot, cmd, args) => {
  var client = bot;
  var colors = [
    "#FF0000",
    "#FFFFFF",
    "#00FF02",
    "#A0D09D",
    "#ADDE12",
    "#AFE321"
  ]
  var action = args[0];

  switch(action) {
    case 'look':
      const color = colors[Math.floor(Math.random() * colors.length)]
      const shop_embed = new MessageEmbed()
        .setColor(color)
        .setTitle(client.user.username + " Shop!")
        .setDescription("This command is in development")
      cmd.reply({
        embeds: [
          shop_embed
        ]
      })
    break;
    case 'buy':
      cmd.reply("Coming soon!")
    break;
    case 'sell':
      cmd.reply("Coming soon!")
  }
}