const mongoose = require('mongoose');
const Seller = require('../models/seller');

module.exports = {
	async getAllSellers(req, res) {
		const page = req.query.page || 1;
		const data = await Seller.paginate({}, { page, limit: 10 });
		res.send({ sellers: data.docs, pages: data.totalPages, total: data.totalDocs });
		// res.send(data);
		console.log(data);
	},

	async getOneSeller(req, res) {
		const { id } = req.params;
		if (!id || !mongoose.Types.ObjectId.isValid(id)) {
			return res.status(422).send({ error: 'Bad seller id' });
		}
		const seller = await Seller.findOne({ _id: id }).lean();
		return res.send({ seller });
	},
	async editSeller(req, res) {
		const { id } = req.params;
		console.log(id);

		try {
			await Seller.updateOne({ _id: id }, { $set: req.body });
			res.send({ message: 'success' });
		} catch (e) {
			res.status(500).send({ error: 'Seller edit error' });
		}
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