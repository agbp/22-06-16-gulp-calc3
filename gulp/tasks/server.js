/* eslint-disable import/no-cycle */
import app from '../gulpApp.js';

const server = () => app.plugins.browserSync.init({
	server: {
		baseDir: `${app.path.build.html}`,
	},
	notify: false,
	port: 3000,
});

export default server;
