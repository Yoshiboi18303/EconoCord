module.exports.help = {
  name: 'leaderboard',
  description: 'View the current guild or global leaderboard!',
  options: [
    {
      type: 3,
      name: 'type',
      description: 'The type of leaderboard to show',
      required: true,
      choices: [
        {
          name: 'guild',
          value: 'server'
        },
        {
          name: 'global',
          value: 'g'
        }
      ]
    }
  ]
}

module.exports.config = {
  cooldown: ms('30s'),
  message: `Dude, please give us some time, you're gonna kill us. (try again in %s)`
}

module.exports.run = async (bot, cmd, args) => {
  const type = args[0];
  switch(type) {
    case 'server':
      return cmd.reply("Coming soon!")
    break;
    case 'g':
      return cmd.reply("Coming soon!")
    break;
  }
}