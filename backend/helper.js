const path = require('path');

module.exports.uploadFile = async (file, fileName) => {
	const type = file.name.split('.').pop().toLowerCase();
	const name = `${fileName}.${type}`;
	const fsPath = path.resolve('./', 'content', name);
	const dbPath = `/content/${name}`;
	await file.mv(fsPath);
	return dbPath;
};