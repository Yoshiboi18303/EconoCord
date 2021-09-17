const Users = require('../models/User');
const { MessageEmbed } = require('discord.js');
const colors = require('../colors.json');
const ms = require('ms');

var jobs = {
	0: "Jobless",
	1: "Cashier",
	2: "YouTuber",
	3: "Manager",
	4: "Banker",
	5: "Lawyer",
	6: "CEO"
}

var promotions = {
	1: 20,
	2: 40,
	3: 60,
	4: 80,
	5: 100,
	6: 140
}

module.exports.help = {
	name: "work",
	description: "Work at your job"
}

module.exports.run = async (bot, cmd, args) => {
  var client = bot
	// console.log("work")
	var user = await Users.findOne({ id: cmd.user.id });
	// console.log(user)
	if (user.job == 0) {
		return cmd.reply(`<@${cmd.user.id}>, You don't have a job. Get one by running \`/start\`.`)
	}

  /*
  if(Date.now() < ms('5m')) {
    timeout_error_embed = new MessageEmbed()
      .setColor(colors.red)
      .setTitle("Hold on buddy...")
      .setDescription("You are still on a timeout right now. Please wait 5 minutes since your last work to go to work again.")
      .setThumbnail(client.no)
      .setTimestamp()
    return cmd.reply(
      {
        embeds: [
          timeout_error_embed
        ]
      }
    )
  }
  */

	switch(user.job) {
		case 1:
			// console.log(user.timesworked)
			var times = user.timesworked[cmd.guild.id]+1 || 0
			
			if (times == promotions[user.job] && user.job != 1) {
				user.job += 1;
				user.save()
				cmd.channel.send(`You've earned a promotion! New career: **${jobs[user.job]}**`)
			}
		break;

		case 2:
			var times = user.timesworked[cmd.guild.id]+1 || 0
			// console.log(times)
			if (times == promotions[user.job] && user.job != 2) {
				user.job += 1;
				user.save()
				cmd.channel.send(`You've earned a promotion! New career: **${jobs[user.job]}**`)
			}
		break;

		case 3:
			var times = user.timesworked[cmd.guild.id]+1 || 0
			// console.log(times)
			if (times == promotions[user.job] && user.job != 3) {
				user.job += 1;
				user.save()
				cmd.channel.send(`You've earned a promotion! New career: **${jobs[user.job]}**`)
			}
		break;

		case 4:
			var times = user.timesworked[cmd.guild.id]+1 || 0
			// console.log(times)
			if (times == promotions[user.job] && user.job != 4) {
				user.job += 1;
				user.save()
				cmd.channel.send(`You've earned a promotion! New career: **${jobs[user.job]}**`)
			}
		break;

		case 5:
			var times = user.timesworked[cmd.guild.id]+1 || 0
			// console.log(times)
			if (times == promotions[user.job] && user.job != 5) {
				user.job += 1;
				user.save()
				cmd.channel.send(`You've earned a promotion! New career: **${jobs[user.job]}**`)
			}
		break;
	}

	var job = jobs[user.job];

	// console.log(job)
  
  let payout = Math.ceil(Math.random() * 100)
	let rate;

	switch(user.job) {
		case 1:
			rate = 10;
		break;

		case 2: 
			rate = 20;
		break;

		case 3: 
			rate = 40;
		break;

		case 4: 
			rate = 80;
		break;

		case 5:
			rate = 300;
		break; // lawyers make bank ngl

		case 6:
			rate = 350;
		break;
  }
  // we take the payout, then multiply the rate divided by 10, it gives special pay boosts for the higher of a career you achieve...
	payout = payout * (rate / 10)

  // console.log(10 * rate / 10)

	var c = {
		guilds: {
			
		}
	}
	
	var coins = user.coins.guilds[cmd.guild.id]
	if (isNaN(coins)) coins = 0
	
	coins = coins + payout

	c.guilds[cmd.guild.id] = coins

	var t = {

	}

	var timesworked = user.timesworked[cmd.guild.id];
	if (isNaN(timesworked)) timesworked = 0

	timesworked+=1;

	t[cmd.guild.id] = timesworked;

	Users.updateOne({ id: cmd.user.id }, { coins: c, timesworked: t, lastwork: Date.now() })
	.then(async () => {
		user = await Users.findOne({ id: cmd.user.id })
		// console.log(user) // refresh user after the update
		var em = new MessageEmbed()
		.setTitle(`Work`)
		.setDescription(`You went to work today.`)
		.addField(`Career`, `**${job}**`)
		.addField(`<:ecoin:888085657778548776> Coins Earned`, `**${payout}**`, true)
		.addField(`<:ecoin:888085657778548776> Total Coins`, `**${user.coins.guilds[cmd.guild.id]}**`, true)
		.setTimestamp()
		.setColor("#00FF02")

		cmd.reply({
      embeds: [
        em
      ]
    })

		// user.save()
	})
}
