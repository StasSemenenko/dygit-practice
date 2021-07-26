const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
	if (req.session) {
		try {
			const data = jwt.verify(req.session.token, config.jwt_key);
			req.user = data.id;
			next();
		} catch (e) {
			res.status(403).send({ error: 'Forbidden!' });
		}
	} else {
		res.status(403).send({ error: 'Forbidden!' });
	}
};
