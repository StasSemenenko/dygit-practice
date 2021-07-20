const express = require('express');
const config = require('config');
const routes = require('./routes');

const app = express();
require('./database').connect();
require('colors');

app.use('/api', routes);

app.listen(config.port, () => {
	console.log(`Server started in ${config.port} port`.blue);
});
