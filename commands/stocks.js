const { MessageEmbed } = require('discord.js');
const Users = require('../models/User');
const StockMarket = require('../stock');

module.exports.help = {
  name: 'stocks',
  description: 'Show, buy from, or sell from the stock market!',
  options: [
    {
      type: 3,
      name: 'action',
      description: 'Choose what you want to do with the stock market',
      required: true,
      choices: [
        {
          name: 'buy',
          value: 'buy'
        },
        {
          name: 'sell',
          value: 'sell'
        },
        {
          name: 'view',
          value: 'view'
        }
      ]
    }
  ]
}

module.exports.config = {
	cooldown: ms("30s"),
	message: `The stock market needs some time to process your awesomeness. Try going back again in %s.`
}

module.exports.run = async (bot, cmd, args) => {
  var client = bot;
  const user = await Users.findOne({
    id: cmd.user.id
  })
  var action = args[0];

  // console.log(action)

  switch(action) {
    case 'view':
      const embed = new MessageEmbed()
        .setColor("BLURPLE")
        .setTitle("Stocks!")
        .setDescription(`<@${cmd.user.id}>, this command is in development.`)
      cmd.reply({
        embeds: [
          embed
        ]
      })
    break;
    case 'buy':
      cmd.reply("Coming soon!")
    break;
    case 'sell':
      cmd.reply("Coming soon!")
    break;
  }
}