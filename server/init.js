const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });

const express = require('express');
const app = express();
const lessMiddleware = require('less-middleware');
const bodyParser = require('body-parser');
const dns = require('dns');
const dnsPromises = dns.promises;

const cors = require('cors');
const compression = require('compression');

// const atob = require('atob');
const key = process.env.AUTH_KEY;
const port = process.env.PORT;
const isRevokedCallback = require('./isRevokedCallback');

const { expressjwt: jwt } = require('express-jwt');

/*
const consultaRotas = async (ip, token) => {
	// console.log('ip, token', ip, token);
	const ipHostsAutorizados = [];
	const dadosToken = await tokenCtrl.show({ ativo: true, token: token });
	// console.log('dadosToken', dadosToken);
	if (((dadosToken || []).ip || []).length < 1) {
		return dadosToken;
	}
	const ipOK = ((dadosToken.ip || []).includes(ip) == true);
	if (ipOK) {
		return dadosToken;
	}
	else {
		if (ipHostsAutorizados.includes(ip) == true) return dadosToken;
		const ok = await existeHost(dadosToken, ip);
		if (ok) {
			ipHostsAutorizados.push(ip);
			return dadosToken;
		}
	}

};
*/


const existeHost = async (dadosToken, ip) => {
	// console.log('existeHost ip', ip, dadosToken);
	let retorno = false;
	const hosts = dadosToken.hosts || [];
	for (const h of hosts) {
		if (h.nome) {
			const dnsIp = await dnsPromises.lookup(h.nome);
			if (ip == dnsIp.address) {
				retorno = true;
			}
		}
	}
	return retorno;
};
/*
const whitelist = ['http://btramos.com',
	'http://localhost',];
*/

const publicRoutes = [
	{ url: '/', methods: ['GET'] },
];

/*
const corsOptionsDelegate = async function(req, callback) {
	// console.log('req.header(Origin)', req.header('Origin'));
	let corsOptions;
	const remote = (
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress
	).split(',')[0];

	// console.log('publicRoutes', publicRoutes);
	const isPublic = await tools.searchInArrayObj(publicRoutes, 'url', req.url);
	// console.log('isPublic', isPublic);

	if (isPublic && (isPublic || []).length > 0) {
		corsOptions = { origin: true };
	}
	else {
		const rotasAutorizadas = await rotaAutorizada(req);
		if (rotasAutorizadas) {
			corsOptions = { origin: true };
		}
		else if (whitelist.indexOf(req.header('Origin')) !== -1 ||
			whitelist.indexOf(remote) !== -1
		) {
			corsOptions = { origin: true };
		}
		else {
			corsOptions = { origin: false };
		}
	}
	if (!corsOptions.origin) {
		callback(new Error(` Not allowed by CORS .... 
		                     ${remote}
		                     Origin: ${req.header('Origin')} `));
	}
	else {
		callback(null, corsOptions);
	}
};
*/
/*
const rotaAutorizada = async (req) => {
	// console.log('rotaAutorizada', 1);
	const remote = (
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress
	).split(',')[0];
	// console.log('rotaAutorizada remote', remote);

	const ip = remote.substring(7, 25);
	let retorno = false;
	let token = req.headers['authorization'];
	token = token ? token.split(' ')[1] : null;


	retorno = true;
	return retorno;

};
*/

const init = async()=> {
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.use(compression());

/*
app.use(cors({ preflightContinue: true }));
// app.use(cors(corsOptionsDelegate));

app.use(jwt({
	secret: key,
	algorithms: ['HS256'],
	isRevoked: isRevokedCallback,
}).unless({ path:publicRoutes }),
);
*/

app.use(function(req, res, next) {
	// console.log('app.use(function(req ', req.rawHeaders);

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-Auth-Token, Content-Type, Content-Length, Authorization, Access-Control-Allow-Headers, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials');

	req.socket.setNoDelay(true);
	next();
});
// auth(app, tokenCtrl);


// const auth = require('./auth');
const routerIndex = require('./routes/index');
//const routerToken = require('./routes/token');

// rotas
app.use('/', routerIndex);


// views
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
	
  })
}

module.exports = {init};