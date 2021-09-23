const { MessageEmbed } = require('discord.js');

module.exports.help = {
  name: 'post',
  description: 'Post the current stats of EconoCord to Statcord'
}

module.exports.config = {
	cooldown: ms("10m"),
	message: `Ugh. Do you just **want** to be ratelimited?`
}

module.exports.run = async (bot, cmd, args) => {
  var client = bot;

  if (!bot.admins.includes(cmd.user.id)) return cmd.reply("Not an owner")

  const success_embed = new MessageEmbed()
    .setColor("#00FF02")
    .setTitle("Success!")
    .setDescription(`Successfully sent all the data on ${client.user.username} to [Statcord](https://statcord.com/bot/844248249857474580)!\nSomething may have happened during the post though, so please check the console.`)

  const error_embed = new MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Error.")
    .setDescription("An error occurred.\n```js\n{}\n```")
  
  try {
    client.stats.post()
    .then(() => {
     cmd.reply({
       embeds: [
         success_embed
       ]
     })
   })
  } catch(e) {
    cmd.reply({
      embeds: [
        error_embed.description.replace(e)
      ]
    })
  }
}