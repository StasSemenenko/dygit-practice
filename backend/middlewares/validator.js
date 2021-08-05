const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const options = {
	abortEarly: true,
};

function validate(req, res, next, schema) {
	const { error } = schema.validate(req.body, options);
	if (error) {
		return res.status(422).send({
			error: 'Validation error',
			errors: error.details.map((e) => e.message),
		});
	}
	next();
}

module.exports.createUser = (req, res, next) => {
	const schema = Joi.object({
		first_name: Joi.string().required(),
		last_name: Joi.string().required(),
		shop_name: Joi.string().required(),
		phone_number: Joi.number().required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
	});
	validate(req, res, next, schema);
};

module.exports.editSeller = (req, res, next) => {
	const schema = Joi.object({
		first_name: Joi.string(),
		last_name: Joi.string(),
		shop_name: Joi.string(),
		phone_number: Joi.number(),
		email: Joi.string().email(),
		password: Joi.string().min(6),
	});
	validate(req, res, next, schema);
};

module.exports.createProduct = (req, res, next) => {
	const schema = Joi.object({
		title: Joi.string().required(),
		description: Joi.string().required(),
		price: Joi.number().required(),
	});
	validate(req, res, next, schema);
};

module.exports.editProduct = (req, res, next) => {
	const schema = Joi.object({
		title: Joi.string(),
		description: Joi.string(),
		price: Joi.number(),
		seller: Joi.objectId(),
	}).unknown(false);
	validate(req, res, next, schema);
};

module.exports.createCustomer = (req, res, next) => {
	const schema = Joi.object({
		first_name: Joi.string().required(),
		last_name: Joi.string().required(),
		email: Joi.string().email().required(),
		phone_number: Joi.number().required(),
		city: Joi.string().required(),
		address: Joi.string().required(),
		zip_code: Joi.number().required(),
	});
	validate(req, res, next, schema);
};

module.exports.editCustomer = (req, res, next) => {
	const schema = Joi.object({
		first_name: Joi.string(),
		last_name: Joi.string(),
		phone_number: Joi.number(),
		email: Joi.string().email(),
		city: Joi.string(),
		address: Joi.string(),
		zip_code: Joi.number(),
	}).unknown(false);
	validate(req, res, next, schema);
};

module.exports.createOrder = (req, res, next) => {
	const schema = Joi.object({
		order_number: Joi.number(),
		customer: Joi.objectId().required(),
		products: Joi.array().items(Joi.object({
			product: Joi.objectId().required(),
			quantity: Joi.number().required(),
		})).required(),
		status: Joi.string().required(),
		amount: Joi.number().required(),
	});
	validate(req, res, next, schema);
};

module.exports.editOrder = (req, res, next) => {
	const schema = Joi.object({
		order_number: Joi.string(),
		customer: Joi.objectId(),
		products: Joi.array().items(Joi.object({
			product: Joi.objectId(),
			quantity: Joi.number(),
		})),
		status: Joi.string(),
		amount: Joi.number(),
	}).unknown(false);
	validate(req, res, next, schema);
};