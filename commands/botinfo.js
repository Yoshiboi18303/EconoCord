const { MessageEmbed, version: djsversion } = require('discord.js');
const { utc } = require('moment');
const ms = require('ms');
const Users = require('../models/User');
const { version } = require('../package.json');
const config = require('../config.json');

module.exports.help = {
  name: 'botinfo',
  description: 'Returns some info on EconoCord in an embed',
  options: [
    {
      type: 3,
      name: 'embed_choice',
      description: 'Choose what embed you want to see on this command',
      required: true,
      choices: [
        {
          name: 'bot',
          value: 'client'
        },
        {
          name: 'partners',
          value: 'prtnrs'
        }
      ]
    }
  ]
}

module.exports.config = {
	cooldown: ms("5s"),
	message: "Please wait %s to use this command."
}

module.exports.run = async (bot, cmd, args) => {
  var client = bot;
  var embed_choice = args[0];

  var replaced_website_state = config.bot.website.state.replace("::", "-")
  var replaced_bot_state = config.bot.state.replace("::", "-")

  switch(embed_choice) {
    case 'client':
      const main_embed = new MessageEmbed()
        .setColor("DARK_GREEN")
        .setTitle("Info on " + client.user.username)
        .addFields([
          {
            name: 'Client Tag',
            value: `${client.user.tag}`,
            inline: true
          },
          {
            name: 'Bot Version',
            value: `v${version}`,
            inline: true
          },
          {
            name: 'Bot State',
            value: `${replaced_bot_state}`,
            inline: true
          },
          {
            name: 'Running on `discord.js` version:',
            value: `v${djsversion}`,
            inline: true
          },
          {
            name: 'NodeJS Version',
            value: `${process.version}`,
            inline: true
          },
          {
            name: 'Date Created',
            value: `${utc(client.user.createdTimestamp).format("MM/DD/YYYY | HH:MM:SS")}`,
            inline: true
          },
          {
            name: 'Time Away from Creation',
            value: `${utc(client.user.createdTimestamp).fromNow()}`,
            inline: true
          },
          {
            name: 'Guild Count',
            value: `${client.guilds.cache.size}`,
            inline: true
          },
          {
            name: 'User Count',
            value: `${client.users.cache.size}`,
            inline: true
          },
          {
            name: 'Document Count',
            value: `${await Users.countDocuments()}`,
            inline: true
          },
          {
            name: 'Website Origin',
            value: `[Go to](https://${config.bot.website.origin})`,
            inline: true
          },
          {
            name: 'Website State',
            value: `${replaced_website_state}`,
            inline: true
          }
        ])
      cmd.reply({
        embeds: [
          main_embed
        ]
      })
    break;
    case 'prtnrs':
      const partners_embed = new MessageEmbed()
        .setColor("#00FF02")
        .setTitle(client.user.username + " Partners")
        .setDescription("Here are all my partners!")
        .addFields([
          {
            name: 'Aoid',
            value: '<@882785086066532412>'
          },
          {
            name: 'Owner of Aoid',
            value: '<@738988218002964581>'
          },
          {
            name: 'Invite Link for Aoid',
            value: '[Click Me!](https://discord.com/oauth2/authorize?client_id=882785086066532412&scope=bot+applications.commands&permissions=8)'
          }
        ])
      cmd.reply({
        embeds: [
          partners_embed
        ]
      })
    break;
  }
}