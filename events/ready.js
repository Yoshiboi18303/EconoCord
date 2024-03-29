var Users = require('../models/User')

module.exports = async (bot) => {
	// check for bots in database

	var removed = []

	bot.users.cache.filter(u => u.bot === true).forEach((user,id) => {
		Users.deleteOne({id})
		.then(() => {
			removed.push(id)
		})
	})

	console.log(`Removed ${removed.length} bots from the database`)

	bot.guilds.cache.forEach(guild => {
		bot.users.cache.filter(u => !u.bot).forEach(user => {
			Users.findOne({ id: user.id }, (err,doc) => {
				if (!doc) {
					doc = new Users({
						id: user.id,
					})

					doc.coins.guilds[guild.id] = 0;
					doc.timesworked.guilds[guild.id] = 0;

					doc.save()
				}
			})
		})

		bot.commands.forEach((cmd) => {
			guild.commands.create(cmd.help)
		})
	})
}