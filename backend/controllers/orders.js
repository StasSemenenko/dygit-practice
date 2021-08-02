const mongoose = require('mongoose');
const Order = require('../models/order');

module.exports = {
	async getAllOrders(req, res) {
		const orders = await Order.find({ seller: req.user }).populate('customer').populate('products.product').lean();
		res.send({ orders });
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
			order_number,
			customer,
			products,
			status,
			quantity,
			amount,
		} = req.body;
		console.log(order_number,
			customer,
			products,
			status,
			quantity,
			amount);
		try {
			await Order.create({
				order_number,
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
