const { EventEmitter } = require('events')

const { Client } = require('discord.js')

var Stock = require('./models/Stock')
var User = require('./models/User')

class StockMarket extends EventEmitter {
	constructor(client) {
		super()

		this.client = client;

		this.users = {

		}

		this.client.users.cache.forEach((user) => {
			this.users[user.id] = {
				stocks: []
			}
		})
	}

	/**
	 * @param {String} user_id
	 * @param {String} stockId
	 * @param {Number} numberOfStocks
	 */
	async buyStock(user_id, guild_id, stockId, numberOfStocks) {
		numberOfStocks = parseInt(numberOfStocks);

		if (isNaN(numberOfStocks)) return;

		var stock = await Stock.findOne({ id: stockId });

		var user = await User.findOne({ id: user_id });

		var price = stock.price * numberOfStocks

		if (price > user.coins.guilds[guild_id]) return false;

		user.coins.guilds[guild_id]-= price;
		
		user.stocks[guild_id][stockId]+= numberOfStocks;

		user.save()

		return true;

	}

	sellStock(user_id, guild_id, stockId, numberOfStocks) {

	}
}

module.exports = StockMarket