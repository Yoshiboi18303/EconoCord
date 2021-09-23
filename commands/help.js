const { MessageEmbed } = require('discord.js');
const colors = require('../colors.json');

module.exports.help = {
  name: 'help',
  description: 'Shows all the commands for EconoCord!',
  options: [
    {
      type: 3,
      name: 'command',
      description: 'A command to search for (optional)',
      required: false
    }
  ]
}

module.exports.run = async (bot, cmd, args) => {
  var client = bot;
  var command = args[0];
  var c = cmd;

  // return cmd.reply("Coming soon!")

   if(!command || typeof command == undefined) {
     const help_embed = new MessageEmbed()
       .setColor(cmd.member.displayHexColor || colors.green)
       .setTitle(`${client.user.username} Commands!`)
       .setDescription(`<@${cmd.user.id}>, Here are all my commands!\nUse \`/command\` to use a command!`)
       .setFooter(`Requested by ${cmd.user.username}`)
       .setTimestamp()
       .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
     for(var [id, cmd] of client.commands) {
      help_embed.addField(`**${cmd.help.name}**`, `Description: "${cmd.help.description}"\nFile: [Go to file](https://github.com/Yoshiboi18303/EconoCord/blob/main/commands/${id}.js)\nUsage: \`/${cmd.help.name}\``, true)
     }
     return c.reply({
       embeds: [
         help_embed
       ]
     })
   } else {
     const command_help_embed = new MessageEmbed()
     return cmd.reply("Coming soon!")
   }
}