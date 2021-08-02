const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema, model, Types } = mongoose;

const orderSchema = new Schema({
	order_number: {
		type: Number,
		// required: true,
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
			default: 1,
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

}).plugin(mongoosePaginate);

autoIncrement.initialize(mongoose.connection);
orderSchema.plugin(autoIncrement.plugin, { model: 'Orders', field: 'order_number' });

module.exports = model('Orders', orderSchema);
