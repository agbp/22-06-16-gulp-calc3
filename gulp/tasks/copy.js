/* eslint-disable import/no-cycle */
import app from '../gulpApp.js';

const copy = () => app.gulp
	.src(app.path.src.files)
	.pipe(app.gulp.dest(app.path.build.files));

export default copy;
