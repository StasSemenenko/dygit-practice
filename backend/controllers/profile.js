const Seller = require('../models/seller');
const helper = require('../helper');
const md5 = require('md5');


module.exports = {
	async profile(req, res) {
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
		console.log(req.body);
		try {
			await Seller.updateOne({ _id: req.user }, updater);
			res.send({ message: 'success' });
		} catch (e) {
			console.log(e);
			res.status(500).send({ error: 'Profile edit error' });
		}
	},
};