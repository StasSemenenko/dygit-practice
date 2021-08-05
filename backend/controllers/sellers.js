const mongoose = require('mongoose');
const Seller = require('../models/seller');

module.exports = {
	async getAllSellers(req, res) {
		const page = req.query.page || 1;
		const data = await Seller.paginate({}, { page, limit: 10 });
		res.send({ sellers: data.docs, pages: data.totalPages, total: data.totalDocs });
	},

	async getProfile(req, res) {
		const profile = await Seller.findOne({ _id: req.user });
		return res.send({ profile });
	},

	async editProfile(req, res) {
		const { first_name, last_name, image, email, phone_number, shop_name, password } = req.body;
		const updater = {
			first_name,
			last_name,
			email,
			phone_number,
			shop_name, 
		}

		if (password) updater.password = md5(password);
		if (req.files && req.files.image) {
			updater.image = await helper.uploadFile(req.files.image, req.user);
		}

		try {
			await Seller.updateOne({ _id: req.user }, updater);
			res.send({ message: 'success' });
		} catch (e) {
			res.status(500).send({ error: 'Profile edit error' });
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