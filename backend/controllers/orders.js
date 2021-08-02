const mongoose = require('mongoose');
const Order = require('../models/order');

module.exports = {
	async getAllOrders(req, res) {
		const page = req.query.page || 1;
		const data = await Order.paginate({ seller: req.user }, {
			page,
			limit: 10,
			populate: [
				{ path: 'customer' },
				{ path: 'products.product' }],
		});
		res.send({ orders: data.docs, pages: data.totalPages, total: data.totalDocs });
	},

	async getOneOrder(req, res) {
		const { id } = req.params;
		if (!id || !mongoose.Types.ObjectId.isValid(id)) {
			return res.status(422).send({ error: 'Bad order id' });
		}
		const order = await Order.findOne({ _id: id })
			.populate('seller')
			.populate('customer')
			.populate('products.product')
			.lean();
		return res.send({ order });
	},

	async createOrder(req, res) {
		const {
			customer,
			products,
			status,
			quantity,
			amount,
		} = req.body;
		console.log(
			customer,
			products,
			status,
			quantity,
			amount,
		);
		try {
			await Order.create({
				seller: req.user,
				customer,
				products,
				status,
				quantity,
				amount,
			});
			res.send({ message: 'success' });
		} catch (e) {
			console.log(e);
			res.status(500).send({ error: 'Order create error' });
		}
	},

	async editOrder(req, res) {
		const { id } = req.params;
		try {
			await Order.updateOne({ _id: id }, req.body);
			res.send({ message: 'success' });
		} catch (e) {
			res.status(500).send({ error: 'Order edit error' });
		}
	},

	async deleteOrder(req, res) {
		const { id } = req.params;
		try {
			await Order.deleteOne({ _id: id });
			res.send({ message: 'success' });
		} catch (e) {
			res.status(500).send({ error: 'Order delete error' });
		}
	},
};
