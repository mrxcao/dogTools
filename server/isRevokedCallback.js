// const mongo = require('./mongo');

module.exports = async (req, payload) => {
	const rotasIgnorar = [
		'/login',
		'/logout',
	];
	const ch = rotasIgnorar.filter(r => {return (req.url.indexOf(r) > -1); }).length > 0 ? false : true;
	if (ch) {
		if (payload.jti) {
			const r = {} 
			if (r) return true;
		}
	}
	return false;
};

