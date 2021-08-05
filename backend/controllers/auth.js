const md5 = require('md5');
const mongoose = require('mongoose');
const helper = require('../helper');
const config = require('config');
const jwt = require('jsonwebtoken');
const Seller = require('../models/seller');

module.exports = {
	async signUp(req, res) {
		const {
			first_name, last_name, shop_name, phone_number, password, email
		} = req.body;
		try {
			if (!req.files) return res.status(422).send({ error: 'Image is required' });
			const id = mongoose.Types.ObjectId();
			const image = await helper.uploadFile(req.files.image, id);
			await Seller.create({
				_id: id,
				first_name,
				last_name,
				shop_name,
				phone_number,
				password: md5(password),
				email,
				image,
			});
		} catch (e) {
			if (e.code === 11000) {
				return res.status(422).send({ error: 'User already exist' });
			}
			console.log(e);
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
			res.clearCookie('connect.sid', { path: '/' });
			res.send({ message: 'success' });
		});
	},
};
