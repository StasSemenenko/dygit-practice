const mongoose = require('mongoose');
const config = require('config');

module.exports.connect = () => {
	mongoose.connect(config.mongo, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	}).then(() => {
		console.log('Mongodb success connected'.blue);
	}).catch(() => {
		console.log('Mongodb error'.red);
	});
};
