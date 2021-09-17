const mongoose = require('mongoose')

const s = mongoose.Schema({
	id: { type: String, required: true, },
	premium: { type: Boolean, default: false },
	shop: { type: Object, default: { items: {} } }
})

module.exports = mongoose.model("guilds", s)