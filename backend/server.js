const express = require('express');
const config = require('config');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');

const app = express();
require('./database').connect();
require('colors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
	store: new FileStore({}),
	secret: config.session_key,
	resave: true,
	saveUninitialized: true,
}));
app.use(helmet());
app.use(cors());
app.use('/api', routes);

app.listen(config.port, () => {
	console.log(`Server started in ${config.port} port`.blue);
});
