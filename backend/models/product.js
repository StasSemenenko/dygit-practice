const { Schema, model, Types } = require('mongoose');

const productSchema = new Schema({
	title: {
		type: String,
		requied: true,
	},
	description: {
		type: String,
		requied: true,
	},
	image: {
		type: String,
		requied: true,
	},
	price: {
		type: Number,
		requied: true,
	},
	seller: {
		type: Types.ObjectId,
		ref: 'Seller',
		required: true,
	},

});

module.exports = model('Product', productSchema);
