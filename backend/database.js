const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const config = require('config');

module.exports.connect = () => {
	mongoose.connect(config.mongo, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	}).then(() => {
		console.log('Mongodb success connected'.blue);
	}).catch(() => {
		console.log('Mongodb error'.red);
	});
	autoIncrement.initialize(mongoose.connection);
};
