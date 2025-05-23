const iconv = require('iconv-lite');

const decode = (text) => {
	return text.replace(/=\?([^?]+)\?([bqBQ])\?([^?]*)\?=/g, (_, charset, encoding, encodedText) => {
		let decoded = '';
		try {
			let buffer;
			if (/^b$/i.test(encoding)) {
				// Base64
				buffer = Buffer.from(encodedText, 'base64');
			}
			else if (/^q$/i.test(encoding)) {
				// Quoted-Printable para headers
				const qp = encodedText
					.replace(/_/g, ' ')
					// eslint-disable-next-line no-shadow
					.replace(/=([A-Fa-f0-9]{2})/g, (_, hex) =>
						String.fromCharCode(parseInt(hex, 16)),
					);
				buffer = Buffer.from(qp, 'binary');
			}

			// Decodifica conforme charset
			decoded = iconv.decode(buffer, charset);
		}
		catch (e) {
			decoded = encodedText;
		}

		return decoded;
	});
};

module.exports = {
	decode,
};