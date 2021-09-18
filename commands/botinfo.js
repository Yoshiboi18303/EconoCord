const { MessageEmbed, version: djsversion } = require('discord.js');
const { utc } = require('moment');
const ms = require('ms');
const Users = require('../models/User');
const { version } = require('../package.json');

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

module.exports.run = async (bot, cmd, args) => {
  var client = bot;
  var embed_choice = args[0];

  switch(embed_choice) {
    case 'client':
      const main_embed = new MessageEmbed()
        .setColor("DARK_GREEN")
        .setTitle("Info on " + client.user.username)
        .addFields([
          {
            name: 'Client Tag',
            value: `${client.user.tag}`
          },
          {
            name: 'Bot Version',
            value: `v${version}`
          },
          {
            name: 'Running on `discord.js` version:',
            value: `v${djsversion}`
          },
          {
            name: 'Node Version',
            value: `${process.version}`
          },
          {
            name: 'Date Created',
            value: `${utc(client.user.createdTimestamp).format("MM/DD/YYYY | HH:MM:SS")}`
          },
          {
            name: 'Time Away from Creation',
            value: `${utc(client.user.createdTimestamp).fromNow()}`
          },
          {
            name: 'Guild Count',
            value: `${client.guilds.cache.size}`
          },
          {
            name: 'User Count',
            value: `${client.users.cache.size}`
          },
          {
            name: 'Document Count',
            value: `${await Users.countDocuments()}`
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