if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const loaders = require('./classes/Loaders');
const pack = require('./package.json');

loaders.init().then(() => {
  console.log(`Pronto! ${pack.name} ver:${pack.version}  localhost:${process.env.PORT}  ${process.env.NODE_ENV} `);    
});


