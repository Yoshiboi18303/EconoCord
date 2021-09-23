const { MessageEmbed } = require('discord.js');
const Users = require('../models/User');

module.exports.help = {
  name: 'redeem',
  description: 'Redeem a chest!',
  options: [
    {
      type: 3,
      name: 'chest',
      description: 'Choose what chest you want to redeem',
      choices: [
        {
          name: 'shoddy',
          value: 'shoddy'
        },
        {
          name: 'basic',
          value: 'basic'
        },
        {
          name: 'voter',
          value: 'voter'
        },
        {
          name: 'graphite',
          value: 'graphite'
        },
        {
          name: 'copper',
          value: 'copper'
        },
        {
          name: 'iron',
          value: 'iron'
        },
        {
          name: 'gold',
          value: 'gold'
        },
        {
          name: 'diamond',
          value: 'diamond'
        },
        {
          name: 'platinum',
          value: 'platinum'
        },
        {
          name: 'vandium',
          value: 'vandium'
        }
      ]
    }
  ]
}

module.exports.config = {
	cooldown: ms(`30s`),
	message: `Patience. This command needs a second.`
}

module.exports.run = async (bot, cmd, args) => {
  var client = bot;
  var chest = args[0];
  var user = await Users.findOne({
    id: cmd.user.id
  })

  if(!user) {
    user = new Users({
      id: cmd.user.id
    })
  }

  coins = user.coins.guilds[cmd.user.id]
}