const md5 = require('md5');
const config = require('config');
const jwt = require('jsonwebtoken');
const Seller = require('../models/seller');

module.exports = {
	async signUp(req, res) {
		const {
			first_name, last_name, shop_name, phone_number, password, email, logo,
		} = req.body;
		try {
			await Seller.create({
				first_name,
				last_name,
				shop_name,
				phone_number,
				password: md5(password),
				email,
				logo,
			});
		} catch (e) {
			if (e.code === 11000) {
				return res.status(422).send({ error: 'User already exist' });
			}
			return res.status(500).send({ error: 'Server error!' });
		}
		return res.send({ message: 'success' });
	},
	async signIn(req, res) {
		const { email, password } = req.body;
		console.log(req.body);
		const seller = await Seller.findOne({ email, password: md5(password) }, '+password');
		if (!seller) return res.status(500).send({ error: 'User not found' });
		const token = jwt.sign({ id: seller.id }, config.jwt_key);
		req.session.token = token;
		req.session.save();
		// req.session.cookie.expires = new Date(Date.now() + 3600000);
		return res.send({ message: 'success' });
	},
	signOut(req, res) {
		req.session.destroy(() => {
			res.send({ message: 'success' });
		});
	},
};
