const Seller = require('../models/seller');

module.exports = {
	signIn(req, res) {
		res.send({ page: 'signIn' });
	},
	signUp(req, res) {
		res.send({ page: 'signUp' });
	},
	signOut(req, res) {
		res.send({ page: 'signOut' });
	},
};
