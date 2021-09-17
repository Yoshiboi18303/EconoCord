const { MessageEmbed } = require('discord.js')

module.exports.help = {
	name: "meme",
	description: "Fetches a random meme and sends it in an embed!"
}

module.exports.run = async (bot, cmd, args) => {
	// console.log(cmd)
	var fetch = await import('node-fetch');
	// you have to do it like that from now on for some reason ^

  var link = "https://some-random-api.ml/meme"

 	var r = await fetch.default(link, {
    method: "GET"
  })
  var data = await r.json()

  // console.log(data)
  
  const meme_caption = data.caption
  const meme_image = data.image
  const meme_category = data.category

  const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(meme_caption)
    .setImage(meme_image)
    .setFooter(`${cmd.member.user.username} requested this. | Category: ${meme_category}`)
  cmd.reply({embeds: [embed]})
}