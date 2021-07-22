const mongoose = require('mongoose');
const Customer = require('../models/customer');

module.exports = {
	async getAllCustomers(req, res) {
		const customers = await Customer.find().lean();
		res.send({ customers });
	},

	async getOneCustomer(req, res) {
		const { id } = req.params;
		if (!id || !mongoose.Types.ObjectId.isValid(id)) {
			return res.status(422).send({ error: 'Bad customer id' });
		}
		const customer = await Customer.findOne({ _id: id }).lean();
		return res.send({ customer });
	},
	async createCustomer(req, res) {
		const {
			first_name, last_name, email, phone_number, city, address, zip_code,
		} = req.body;
		try {
			await Customer.create({
				first_name,
				last_name,
				email,
				phone_number,
				city,
				address,
				zip_code,
			});
			res.send({ message: 'success' });
		} catch (e) {
			res.status(500).send({ error: 'Customer create error' });
		}
	},
	async editCustomer(req, res) {
		const { id } = req.params;
		try {
			await Customer.updateOne({ _id: id }, req.body);
			res.send({ message: 'success' });
		} catch (e) {
			res.status(500).send({ error: 'Customer edit error' });
		}
	},
	async deleteCustomer(req, res) {
		const { id } = req.params;
		try {
			await Customer.deleteOne({ _id: id });
			res.send({ message: 'success' });
		} catch (e) {
			res.status(500).send({ error: 'Customer delete error' });
		}
	},
};