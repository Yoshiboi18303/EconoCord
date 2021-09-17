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

module.exports.run = async (bot, cmd, args) => {
  var cclient = bot
  var code = args.join(" ")
  let bad_item;
  if (!bot.admins.includes(cmd.user.id)) return cmd.reply("Not an owner")

  var secrets = [
    cclient.token
  ]

  for(const secret in secrets) {
    // console.log(secret)
    bad_item = secret
  }
  
	var result = new Promise((resolve, reject) => {
    // if(code.includes(bad_item)) {
    //   return "[ REDACTED ]"
    // }
		resolve(eval(args.join(" ")));
	})

	result
	.then(output => {
		if (typeof output !== "string") output = util.inspect(output, {depth:0});

		cmd.reply("```js\n"+output+"```")
	})
	.catch(output => {
		if (typeof output !== "string") output = util.inspect(output, {depth:0});

		cmd.reply("```js\n"+output+"```")
	})
}