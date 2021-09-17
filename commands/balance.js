const { MessageEmbed } = require('discord.js');
const Users = require('../models/User');

module.exports.help = {
  name: 'balance',
  description: 'Check the balance of someone!',
  options: [
    {
      type: 6,
      name: 'user',
      description: 'The user to be searching the balance of',
      required: false
    }
  ]
}

module.exports.run = async (bot, cmd, args) => {
  var client = bot;
  var user_to_use = args[0];

  if(!user_to_use) {
    user_to_use = cmd.user.id
  }

	var u = await bot.users.fetch(user_to_use)

  if(u.bot) {
    return cmd.reply("This user is a bot, which can't be used in the Economy System!")
  }

  var user = await Users.findOne({ // you have to await this
    id: user_to_use
  })

	if (!user) {
		user = new Users({
			id: user_to_use
		})

		user.coins = {
			guilds: {}
		}

		user.coins.guilds[cmd.guild.id] = 0;

		user.save()
	}

  var coins = user.coins.guilds[cmd.guild.id]
	if (isNaN(coins)) coins = 0
	user.save()

  const balance_embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(u.username + "'s Balance")
    .addFields([{
      name: 'Coins',
      value: `**${coins}**`
    }])
  cmd.reply({
    embeds: [
      balance_embed
    ]
  })
}