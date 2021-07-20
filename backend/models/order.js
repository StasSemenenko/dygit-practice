const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
	orderNumber: {
		type: Number,
		required: true,
	},
	seller: {
		type: String,
		ref: 'Seller',
		required: true,
	},
	customer: {
		type: String,
		ref: 'Customer',
		required: true,
	},
	products: {
		type: String,
		ref: 'Product',
		required: true,
	},
	status: {
		type: String,
		required: true,
		enum: ['created', 'processing', 'shipped', 'received', 'cancelled'],
	},
	quantity: {
		type: Number,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},

});

module.exports = model('Orders', orderSchema);
