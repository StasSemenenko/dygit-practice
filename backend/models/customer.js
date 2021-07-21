const { Schema, model } = require('mongoose');

const customerSchema = new Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone_number: {
		type: Number,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	zip_code: {
		type: Number,
		required: true,
	},
});

module.exports = model('Customer', customerSchema);
