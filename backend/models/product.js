const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	title: {
		type: String,
		requied: true,
	},
	description: {
		type: String,
		requied: true,
	},
	imge: {
		type: String,
		requied: true,
	},
	price: {
		type: Number,
		requied: true,
	},
	sellerId: {
		type: Number,
		ref: 'sellers',
		requied: true,
	},

});

module.exports = model('Products', productSchema);
