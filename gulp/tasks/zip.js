/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import del from 'del';
import gulpZip from 'gulp-zip';
import app from '../../gulpfile.js';

const zip = () => {
	del(`./${app.path.rootFolder}.zip`);
	return app.gulp
		.src(`${app.path.buildFolder}/**/*.*`, {})
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'ZIP',
					message: 'Error: <%= error.message %>',
				}),
			),
		)
		.pipe(gulpZip(`${app.path.rootFolder}.zip`))
		.pipe(app.gulp.dest('./'));
};

export default zip;
