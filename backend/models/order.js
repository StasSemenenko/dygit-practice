const { Schema, model, Types } = require('mongoose');

const orderSchema = new Schema({
	order_number: {
		type: Number,
		required: true,
	},
	seller: {
		type: Types.ObjectId,
		ref: 'Seller',
		required: true,
	},
	customer: {
		type: Types.ObjectId,
		ref: 'Customer',
		required: true,
	},
	products: [{
		_id: false,
		product: {
			type: Types.ObjectId,
			ref: 'Product',
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
	}],
	status: {
		type: String,
		required: true,
		enum: ['created', 'processing', 'shipped', 'received', 'cancelled'],
	},
	amount: {
		type: Number,
		required: true,
	},

});

module.exports = model('Orders', orderSchema);
