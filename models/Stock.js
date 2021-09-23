var s = new mongoose.Schema({
	stockId: { type: String, required: true },
	name: { type: String, required: true },
	price: { type: Number, required: true }
})

module.exports = mongoose.model("stocks", s)