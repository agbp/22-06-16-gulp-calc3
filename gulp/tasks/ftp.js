/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import vinylFtp from 'vinyl-ftp';
import util from 'gulp-util';
import configFtp from '../config/ftp.js';
import app from '../gulpApp.js';

const ftp = () => {
	configFtp.log = util.log;
	const ftpConnect = vinylFtp.create(configFtp);
	return app.gulp
		.src(`${app.path.buildFolder}/**/*.*`, {})
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'FTP',
					message: 'Error: <%= error.message %>',
				}),
			),
		)
		.pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
};

export default ftp;
