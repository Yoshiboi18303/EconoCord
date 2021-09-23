const mongoose = require('mongoose');

const s = mongoose.Schema({
	id: { type: String, required: true, },
	admin: { type: Boolean, default: false },
	coins: { type: Object, default: { guilds: {} } },
  nickname: { type: String, default: "User" },
	blacklisted: { type: Boolean, default: false },
	job: { type: Object, default: { guilds: { } } },
  lastwork: { type: Object, default: { guilds: { } }},
  timesworked: { type: Object, default: {
    guilds: {}
  } },
  inventory: {
    type: Object,
    default: {
      guilds: {}
    }
  },
  stocks: {
    type: Object,
    default: {
      guilds: {}
    }
  }
})

module.exports = mongoose.model("users", s)