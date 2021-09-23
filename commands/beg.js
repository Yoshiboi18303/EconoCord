const { MessageEmbed } = require('discord.js');
const Users = require('../models/User');

var ppl = [
	"Brad Pitt",
	"Chris Hemsworth",
	"Angela Jolie",
	"Robert Downey Jr.",
	"Scarlet Johannson",
	"Justin Bieber",
	"Tom Cruise",
	"Dwayne Johnson",
	"Will Smith",
	"Johnny Depp",
	"Leonardo DiCaprio",
	"Tom Hanks",
	"Eddie Murphy",
	"Dave Chappell",
	"Arnold Schwarzenegger",
	"Keanu Reeves",
	"Elon Musk",
	"Michael Jordan"
]

var rich_ppl = [
	"Tom Cruise",
	"Michael Jordan",
	"Elon Musk",
	"Tom Hanks",
	"Arnold Schwarzenegger",
	"Dwayne Johnson",
	"Keanu Reeves",
	"Robert Downey Jr."
]
 
module.exports.help = {
  name: 'beg',
  description: 'Beg for some coins!'
}

module.exports.config = {
  cooldown: ms('2m'),
  message: 'You seriously need a job. Try this command again in %t.'
}

module.exports.run = async (bot, cmd, args) => {
  var client = bot;
  var user = await Users.findOne({ id: cmd.user.id })

	var person = ppl[Math.floor(Math.random() * ppl.length)]

	// console.log(person)

  var coins_earned = Math.ceil(Math.random() * 75)

	var chance = Math.random() > .5

	if (rich_ppl.includes(person)) {
		coins_earned += 100
	}

	if (chance == true) {
		user.coins.guilds[cmd.guild.id] = user.coins.guilds[cmd.guild.id] + coins_earned;

		await user.save()
		.then(() => {
			cmd.reply(`**${person}**: "Hey **${cmd.member.displayName}**, I saw you begging and thought you might want **${coins_earned}** coins."`)
      // I remember some stories using that lmao.
		})
	} else {
		cmd.reply(`Nobody was generous today.`)
	}

  // return cmd.reply("Coming soon!")
}