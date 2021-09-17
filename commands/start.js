const { MessageEmbed } = require('discord.js');
const Users = require('../models/User');
const colors = require('../colors.json');

module.exports.help = {
	name: "start",
	description: "Start your journey by running this command!",
  options: [
    {
      type: 3,
      name: 'nickname',
      description: "Your nickname on the Economy system (default: Your Username)"
    }
  ]
}

module.exports.run = async (bot, cmd, args) => {
  var client = bot;
  var u = client.users.fetch(cmd.user.id)

  if(u.bot) return cmd.reply("Bots can't use this system!")
  var user = await Users.findOne({
    id: cmd.user.id
  })
	if (!user) {
		user = new Users({
			id: cmd.user.id
		})
		user.save()
	}

  if (user.job > 0) {
    const already_started_embed = new MessageEmbed()
      .setColor("#FF0000")
      .setTitle("Error")
      .setThumbnail(client.no)
      .setDescription(`<@${cmd.user.id}>, You have already started.`)
      .setFooter(`${cmd.user.username} forgot they already started, lmao.`)
			.setTimestamp()
    return cmd.reply({
      embeds: [
        already_started_embed
      ]
    })
  } else {
    const starter_channel = client.channels.fetch("847912308172652595")
    const started_embed = new MessageEmbed()
  	.setColor("#00FF02")
    .setTitle("Success!")
		.setThumbnail(client.yes)
    .setDescription("You have successfully started your first job. Run `/work` to start making money!")
    .setFooter(`${cmd.user.username} successfully started!`)
		.setTimestamp()

    // const new_starter_embed = new MessageEmbed()
    // .setColor("#00FF02")
    // .setTitle("New User!")
    // .setThumbnail(client.new_user)
    // .setDescription(`A new user started using EconoCord!`)
    // .addFields([
    //   {
    //     name: 'User',
    //     value: cmd.user.username
    //   },
    //   {
    //     name: 'Guild',
    //     value: cmd.guild.name
    //   }
    // ])

		Users.updateOne({ id: cmd.user.id }, { job:1, nickname: args.join(" ") || cmd.user.username })
		.then(() => {
			cmd.reply({
      	embeds: [
        	started_embed
      	]
    	})
    //   starter_channel.send({
    //     embeds: [
    //       new_starter_embed
    //     ]
    //   })
		})
		.catch(err => {
			cmd.reply("Something went wrong, please try again later.")
		})
  }
}