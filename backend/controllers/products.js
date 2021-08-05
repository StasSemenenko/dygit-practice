const mongoose = require('mongoose');
const Product = require('../models/product');
const helper = require('../helper');

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
			title, description, price,
		} = req.body;
		try {
			if (!req.files) return res.status(422).send({ error: 'Image is required' });
			const id = mongoose.Types.ObjectId();
			const image = await helper.uploadFile(req.files.image, id);

			await Product.create({
				_id: id,
				title,
				description,
				price,
				image,
				seller: req.user,
			});
			res.send({ message: 'success' });
		} catch (e) {
			res.status(500).send({ error: 'Product create error' });
		}
	},
	async editProduct(req, res) {
		const { id } = req.params;
		const {
			title, description, price,
		} = req.body
		try {
			if (!req.files) return res.status(422).send({ error: 'Image is required' });
			const image = await helper.uploadFile(req.files.image, id);
			
			await Product.updateOne({ _id: id }, {
				_id: id,
				title,
				description,
				price,
				image,
				seller: req.user,
			});
			console.log(id);
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