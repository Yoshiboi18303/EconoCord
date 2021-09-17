const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: 32767 })
const { utc } = require('moment')
const mongoose = require('mongoose');
const Statcord = require('statcord.js');

const User = require('./models/User')

const statcord = new Statcord.Client({
  client,
  key: process.env.STCODK,
  postCpuStatistics: true,
  postMemStatistics: true,
  postNetworkStatistics: true
})

client.commands = new Collection()
client.fs = require('fs');
client.ready = false;
client.events = new Collection()
client.base;
client.admins = []
client.no = "https://cdn.discordapp.com/attachments/849015839414812713/885347417447366656/NO.png"
client.yes = "https://cdn.discordapp.com/attachments/849015839414812713/885348007514607676/YES.png"
client.new_user = "https://cdn.discordapp.com/attachments/847920887457644574/847954954069344296/NEW_PLAYER.png"
client.stats = statcord

var bot = client

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then(console.log("Connected to MongoDB!"))
	.catch(console.error)

client.fs.readdirSync('./commands/').filter(f => f.endsWith(".js")).forEach((f,i) => {
	var cmd = require(`./commands/${f}`);
	// console.log(cmd)

	try {
		client.commands.set(cmd.help.name, cmd);
		client.ready = true;
	} catch(err) {
		console.error(err)
	}
})

client.fs.readdirSync('./events/').filter(f => f.endsWith('.js')).forEach((f,i) => {
	var event = require(`./events/${f}`);

	try {
		client.events.set(f.split(".").shift(), event)
	} catch(err) {
		console.error(err)
	}
})

var commands = client.fs.readdirSync('./commands/')

client.on('ready', async () => {
  // console.log(client.guilds.cache.size)
	var i = setInterval(async () => {
		if (client.ready) {
			console.log(`${bot.user.username} is ready!`);

			// bot.guilds.cache.forEach(g => g.leave())

			bot.events.get('ready')(client)

			clearInterval(i)
		}
	}, 1000)

	client.base = bot.guilds.cache.get("833671287381032970");

	for (var [id, member] of client.base.members.cache) {
		if (member.roles.cache.has("844231385760792596")) {
			client.admins.push(id)
		}
	}

  statcord.autopost()

  setInterval(async () => {
    const statuses = [`Economy in ${client.guilds.cache.size} servers!`, `Economy with ${client.users.cache.size} users`, `/start`, `${await User.countDocuments()} users using the economy system!`]
    var status = statuses[Math.floor(Math.random() * statuses.length)]
    await client.user.setActivity(
      status,
      {
        type: "WATCHING"
      }
    )
  }, 10000)

  console.log("EconoCord was created on: " + utc(client.user.createdTimestamp).format("MM/DD/YYYY HH:MM:SS"))
})
 
bot.on('interactionCreate', async (interaction) => {
	// console.log(interaction)
	// if (interaction.user.bot) return;
	if (!interaction.isCommand()) return;
	
	var args = []

	// console.log(interaction)

	var user = await User.findOne({ id: interaction.user.id })
	if (!user) {
		user = new User({
			id: interaction.user.id,
		})

		user.save()
	}

  if(user.blacklisted == true) {
    return interaction.reply(`Sorry. You are blacklisted from using **${client.user.username}**`)
  }

	interaction.options.data.forEach((c) => {
		args.push(c.value)
	})

	var cmd = bot.commands.get(interaction.commandName)
	// console.log(cmd)
	// console.log(interaction)
	if (cmd) {
		// console.log(cmd)
		// if (Permissions(bot, cmd.help, cmd.member)) {
		try { cmd.run(bot, interaction, args) } catch(e) {
			console.error(e)
			interaction.reply(`This command is a work in progress.`)
		}
		// }
	}
})

statcord.on("autopost-start", () => {
    console.log(`Statcord autopost on ${client.user.username} has started!`);
});

statcord.on("post", status => {
    if (!status) console.log("Successful post");
    else console.error(status);
});

client.login(process.env.token)

module.exports = bot