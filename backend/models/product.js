const { Schema, model, Types } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

}).plugin(mongoosePaginate);

module.exports = model('Product', productSchema);
