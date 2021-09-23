const util = require('util')

const Users = require('../models/User')

var client = require('../client')

var perms = [

]

var i = setInterval(() => {
	if (client.ready) {
		client.admins.forEach(admin => {
			perms.push({
				id: admin,
				type: 2,
				permission: true
			})
		})

		clearInterval(i)
	}
}, 500)

module.exports.help = {
	name: "eval",
	description: "Evaluates JavaScript code",
	type: 1,
	options: [
		{
			type: 3,
			name: "code",
			description: "Code to evaluate"
		}
	],
	permissions: perms
}

module.exports.config = {
	cooldown: 0, // since only devs can use i figured theres no spam risk
	message: "Please wait %s to use this command."
}

module.exports.run = (bot, cmd, args) => {
  var cclient = bot
  var code = args.join(" ")
  if (!bot.admins.includes(cmd.user.id)) return cmd.reply("Not an owner")

  var secrets = [
    cclient.token,
		process.env.MONGO_CONNECTION_STRING,
    process.env.token
  ]
  
	var result = new Promise((resolve, reject) => {
		resolve(eval(args.join(" ")));
	})

	result
	.then(output => {
		if (typeof output !== "string") output = util.inspect(output, {depth:0});

		for (const term of secrets) {
			if (output.includes(term)) output = output.replace(term, '[SECRET]')
		}

		if (output.length > 2000) {

			var buffer = Buffer.from(output);

			var attachment = new MessageAttachment(buffer, "output.txt")
			output = "Output is too long to show on Discord, so here's a file."

			return cmd.reply({ content: output, files: [attachment] })
		}

		cmd.reply("```js\n"+output+"```")
	})
	.catch(output => {
		if (typeof output !== "string") output = util.inspect(output, {depth:0});

		for (const term of secrets) {
			if (output.includes(term)) output = output.replace(term, '[SECRET]')
		}

		cmd.reply("```js\n"+output+"```")
	})
}