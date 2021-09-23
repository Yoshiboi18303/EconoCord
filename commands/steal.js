const { MessageEmbed } = require('discord.js');
const Users = require('../models/User');

module.exports.help = {
  name: 'steal',
  description: 'Steal some cash from the vault of another user! (1 in 20 chance of success)',
  options: [
    {
      type: 6,
      name: 'user',
      description: 'Select the user to steal money from',
      required: true
    }
  ]
}

module.exports.config = {
	cooldown: ms("2m"),
	message: `Give the cops some time to lose your trail. Try another heist in %t.`
}

module.exports.run = async (bot, cmd, args) => {
  var client = bot;
  var user_to_rob_from = args[0]

  const author = await Users.findOne({
    id: cmd.user.id
  })
  const robbed_user = await Users.findOne({
    id: user_to_rob_from.id
  })

  console.log(user_to_rob_from.id)

  console.log(author, robbed_user)

  if(robbed_user == null) {
    return cmd.reply("This user is not on the database, sorry!")
  }

  cmd.reply("Coming soon!")
}