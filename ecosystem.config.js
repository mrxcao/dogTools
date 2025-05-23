module.exports = {
	apps: [{
		name: 'dogTools',
		script: './index.js',
		watch: true,
		ignore_watch: ['node_modules', 'public', 'views', '.git'],
	}],
};
