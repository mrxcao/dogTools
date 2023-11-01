const server_ = require('../server/init');
class Loaders {
	async init() {		
		console.log('1',1);
		await server_.init();
		console.log('1',2);
	}

}

module.exports = new Loaders();