const { Schema, model } = require('mongoose');

const sellerSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	shopName: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: Number,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	logo: {
		type: String,
		required: true,
		default: 'https://i.pinimg.com/originals/78/09/98/780998409b52ce6887ce2ed101709033.png',
	},
});

module.exports = model('Seller', sellerSchema);
