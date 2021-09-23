global.ms = require('ms')
global.fs = require('fs')
global.voice = require('@discordjs/voice')
global.mongoose = require('mongoose')
global.Users = require('./models/User')
global.Guilds = require('./models/Guild')
global.Stocks = require('./models/Stock')
global.MessageEmbed = require('discord.js').MessageEmbed
global.MessageAttachment = require('discord.js').MessageAttachment
global.moment = require('moment')
global.path = require('path');
require('moment-duration-format')

const {
	Client,
	Intents,
	Collection
} = require('discord.js');
const client = new Client({
	intents: 32767
})
const {
	utc
} = require('moment');
const mongoose = require('mongoose');
const Statcord = require('statcord.js');

const User = require('./models/User');

const statcord = new Statcord.Client({
	client,
	key: process.env.STCODK,
	postCpuStatistics: true,
	postMemStatistics: true,
	postNetworkStatistics: true
})
const config = require('./config.json');

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
client.timeout_image = "https://cdn.discordapp.com/attachments/847920887457644574/888857465951780865/ffeererer-removebg-preview.png"
client.support = config.bot.support

var bot = client

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then(console.log("Connected to MongoDB!"))
	.catch(console.error)

client.fs.readdirSync('./commands/').filter(f => f.endsWith(".js")).forEach((f, i) => {
	var cmd = require(`./commands/${f}`);
	// console.log(cmd)

	try {
		client.commands.set(cmd.help.name, cmd);
		client.ready = true;
	} catch (err) {
		console.error(err)
	}
})

client.fs.readdirSync('./events/').filter(f => f.endsWith('.js')).forEach((f, i) => {
	var event = require(`./events/${f}`);

	try {
		client.events.set(f.split(".").shift(), event)
	} catch (err) {
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

	// require('./app');

	client.base = bot.guilds.cache.get("845750926836498463");

	for (var [id, member] of client.base.members.cache) {
		if (member.roles.cache.has("888561008883425320")) {
			client.admins.push(id)
		}
	}

	statcord.autopost()

	setInterval(async () => {
		const statuses = [`Economy in ${client.guilds.cache.size} servers!`, `Economy with ${client.users.cache.size} users`, `/start`, `${await User.countDocuments()} users using the economy system!`]
		var status = statuses[Math.floor(Math.random() * statuses.length)]
		await client.user.setActivity(
			status + ` | /help`, {
				type: "WATCHING"
			}
		)
	}, 10000)

	console.log("EconoCord was created on: " + utc(client.user.createdTimestamp).format("MM/DD/YYYY HH:MM:SS"))
})

var usedRecently = new Map();

bot.on('interactionCreate', async (int) => {
	// console.log(int)
	if (int.user.bot) return;
	if (!int.isCommand()) return;

	var args = []

	await int.defer()

	// console.log(int)

	var user = await User.findOne({
		id: int.user.id
	})
	if (!user) {
		user = new User({
			id: int.user.id,
		})

		user.save()
	}

	int.options.data.forEach((c) => {
		args.push(c.value)
	})

	var cmd = bot.commands.get(int.commandName)

	// console.log(cmd)
	// console.log(int)
	if (cmd) {
		if (user.blacklisted) {
			return int.reply(`:no_entry: Sorry. You are blacklisted from using **${client.user.username}**`)
		} else {
			
				cmd.run(bot, int, args);

		}
	}
})

client.on('warn', (info) => {
	console.warn(info)
})

var secrets = [
	bot.token,
	process.env.MONGO_CONNECTION_STRING,
	// process.env.token,
	process.env.STCODK
]

client.on('messageCreate', (message) => {
	if (!message.author.bot && message.mentions.members.first() === message.guild.me) {
		var m = new MessageEmbed()
		.setTitle(`EconoCord`)
		.setDescription(`Welcome to EconoCord! To see a list of commands and what they do, run \`/help\``)
		.setTimestamp()
		.setColor("GREEN")

		message.reply({ embeds: [ m]})
	}

	if (message.member == message.guild.me) {
		for (var term of secrets) {
			if (message.content.includes(term)) {
				message.edit(message.content.replace(term, "[SENSITIVE]"))
			}
		}
	}

})

statcord.on("autopost-start", () => {
	console.log(`Statcord autopost on ${client.user.username} has started!`);
});

statcord.on("post", status => {
	if (status) return console.error(status);
});

client.login(process.env.token)

module.exports = bot