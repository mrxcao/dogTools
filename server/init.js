const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });

const express = require('express');
const app = express();
const lessMiddleware = require('less-middleware');
const bodyParser = require('body-parser');

const compression = require('compression');

const port = process.env.PORT;

const init = async () => {
	app.use(express.json());

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());

	app.use(compression());

	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, POST, PUT, DELETE');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-Auth-Token, Content-Type, Content-Length, Authorization, Access-Control-Allow-Headers, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials');
		req.socket.setNoDelay(true);
		next();
	});

	// rotas
	const routerIndex = require('./routes/index');
	app.use('/', routerIndex);

	app.use(lessMiddleware(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, 'public')));

	// ejs server
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/views');

	app.listen(port, () => {
		console.log('-- port:', port);
		console.log('-- file:///' + __dirname + '/views/index.html');
	});
};

module.exports = { init };