if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const loaders = require('../classes/Loaders');
const pack = require('../package.json');

loaders.init().then(() => {
	tools.clog(`Pronto! ${pack.name} ver:${pack.version}  ${process.env.NODE_ENV} `);
});
