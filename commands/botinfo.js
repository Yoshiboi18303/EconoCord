const { MessageEmbed } = require('discord.js');
const { utc } = require('moment');
const ms = require('ms');
const Users = require('../models/User');

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
        .setDescription("There are no partners right now... :frowning:\nPlease feel free to DM `Yoshiboi18303#4045` if you want to be the first partner though!")
      cmd.reply({
        embeds: [
          partners_embed
        ]
      })
    break;
  }
}