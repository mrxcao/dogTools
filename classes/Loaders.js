const server_ = require('../server/init');
class Loaders {
	async init() {		
		await server_.init();
	}

}

module.exports = new Loaders();