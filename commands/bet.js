const Users = require('../models/User');

module.exports.help = {
  name: 'bet',
  description: 'Bet some of your coins to try to win more! (1 in 10 chance of winning)',
	type: 1,
	options: [
		{
			name: "amount",
			type: 4,
			description: "Amount of coins you want to bet",
			required: true
		}
	]
}

module.exports.run = async (bot, cmd, args) => {
	var amount = args[0]; // dont join them so amount stays a number

  if(amount < 1) {
    return cmd.reply("You need to bet at least 1 coin lmao.")
  }

	var user = await Users.findOne({ id: cmd.user.id });

	if (amount > user.coins.guilds[cmd.guild.id]) return cmd.reply(`You don't have **${amount}** coins to bet!`);

	var chance = Math.random() < .1;

	if (!chance) {
		var c = {
			guilds: {

			}
		}

		var coins = user.coins.guilds[cmd.guild.id];

		coins = coins - amount;

		c.guilds[cmd.guild.id] = coins

		Users.updateOne({ id: cmd.user.id }, { coins: c })
		.then(async () => {
			user = await Users.findOne({ id: cmd.user.id });
			cmd.reply(`Oops! You lost the bet (Las Vegas style).\nCoins: **${user.coins.guilds[cmd.guild.id]}**`)
		})
	} else {
    increment = amount * 2
		user.coins.guilds[cmd.guild.id] += increment
		user.save()
		return cmd.reply(`Noice! You won the bet.\nCoins: **${user.coins.guilds[cmd.guild.id]}**`)
	}

}