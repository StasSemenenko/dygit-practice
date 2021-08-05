const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const sellerSchema = new Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	shop_name: {
		type: String,
		required: true,
	},
	phone_number: {
		type: Number,
		required: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	image: {
		type: String,
		default: 'https://i.pinimg.com/originals/78/09/98/780998409b52ce6887ce2ed101709033.png',
	},
}).plugin(mongoosePaginate);

module.exports = model('Seller', sellerSchema);
