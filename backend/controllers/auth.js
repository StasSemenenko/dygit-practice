const md5 = require('md5');
const Seller = require('../models/seller');

module.exports = {
	async signUp(req, res) {
		const {
			first_name, last_name, shop_name, phone_number, password, email, logo,
		} = req.body;
		const seller = await Seller.findOne({ email }).lean();
		if (!seller) {
			await Seller.create({
				first_name,
				last_name,
				shop_name,
				phone_number,
				password: md5(password),
				email,
				logo,
			});
			res.send({ message: 'success' });
		} else {
			res.status(400).send({ error: 'User already exist' });
		}
	},
	async signIn(req, res) {
		const { email, password } = req.body;
		const seller = await Seller.findOne({ email, password: md5(password) });
		if (!seller) return res.status(500).send({ error: 'User not found' });
		return res.send({ message: 'success' });
	},
	signOut(req, res) {
		res.send({ message: 'success' });
	},
};
