const mongoose = require('mongoose');
const Seller = require('../models/seller');

module.exports = {
	async getAllSellers(req, res) {
		const sellers = await Seller.find().lean();
		res.send({ sellers });
	},

	async getOneSeller(req, res) {
		const { id } = req.params;
		if (!id || !mongoose.Types.ObjectId.isValid(id)) {
			return res.status(422).send({ error: 'Bad seller id' });
		}
		const seller = await Seller.findOne({ _id: id }).lean();
		return res.send({ seller });
	},
	async deleteSeller(req, res) {
		const { id } = req.params;
		try {
			await Seller.deleteOne({ _id: id });
			res.send({ message: 'success' });
		} catch (e) {
			res.status(500).send({ error: 'Seller delete error' });
		}
	},
};