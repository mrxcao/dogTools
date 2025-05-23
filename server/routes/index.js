const express = require('express');
const router = express.Router();
const boxTrap = require('../modules/boxTrap');
const crypt = require('../modules/crypt');
// eslint-disable-next-line no-unused-vars

router.get('/', function(req, res) {
	const data = {
		app:'dogTools',
		ok:true,
	};
	res.status(200).send(data);
});
router.post('/post', async (req, res) => {
	if (req.body) {
		res.status(200).json({ ok:true, data: req.body });
	}
	else {
		res.status(500).json({ ok:false, data: req.body });
	}
});
router.post('/boxTrapText', async (req, resp) => {
	try {
		const res = await boxTrap.makeText(req.body.texto);
		resp.send(res);
	}
	catch (error) {
		resp.status(500).send(error);
	}
});
router.post('/decode', async (req, resp) => {
	try {
		const res = await crypt.decode(req.body.texto);
		resp.send(res);
	}
	catch (error) {
		resp.status(500).send(error);
	}
});
module.exports = router;

