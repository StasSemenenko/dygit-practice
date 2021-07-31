const mongoose = require('mongoose');
const Product = require('../models/product');

module.exports = {
	async getAllProducts(req, res) {
		const page = req.query.page || 1;
		const data = await Product.paginate({ seller: req.user }, { page, limit: 10, populate: 'seller' });
		res.send({ products: data.docs, pages: data.totalPages, total: data.totalDocs });
	},

	async getOneProduct(req, res) {
		const { id } = req.params;
		if (!id || !mongoose.Types.ObjectId.isValid(id)) {
			return res.status(422).send({ error: 'Bad product id' });
		}
		const product = await Product.findOne({ _id: id }).populate('seller').lean();
		return res.send({ product });
	},
	async createProduct(req, res) {
		const {
			title, description, image, price,
		} = req.body;
		try {
			await Product.create({
				title,
				description,
				image,
				price,
				seller: req.user,
			});
			res.send({ message: 'success' });
		} catch (e) {
			res.status(500).send({ error: 'Product create error' });
		}
	},
	async editProduct(req, res) {
		const { id } = req.params;
		try {
			await Product.updateOne({ _id: id }, req.body);
			res.send({ message: 'success' });
		} catch (e) {
			res.status(500).send({ error: 'Product edit error' });
		}
	},
	async deleteProduct(req, res) {
		const { id } = req.params;
		try {
			await Product.deleteOne({ _id: id });
			res.send({ message: 'success' });
		} catch (e) {
			res.status(500).send({ error: 'Product delete error' });
		}
	},
};