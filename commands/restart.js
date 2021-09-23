const cp = require('child_process');

module.exports.help = {
  name: 'restart',
  description: 'Restarts the bot!'
}

module.exports.config = {
	cooldown: 0,
	message: ``
}

module.exports.run = async (bot, cmd, args) => {
	if (!bot.admins.includes(cmd.user.id)) return cmd.reply(`Not an owner`)

	cmd.reply("Restarting...")

	var child = cp.spawn('node .', { detached: true, stdio: [ 'ignore', null, null ] });

	child.unref()
	
	cmd.followUp("Restarted.")
	.then(process.exit(0))
}