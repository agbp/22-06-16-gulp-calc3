/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack-stream';
import app from '../gulpApp.js';

const js = () => app.gulp
	.src(app.path.src.js, { sourcemaps: !app.isBuild })
	.pipe(
		app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'JS',
				message: 'Error: <%= error.message %>',
			}),
		),
	)
	.pipe(
		webpack({
			mode: app.isBuild ? 'production' : 'development',
			output: {
				filename: 'app.min.js',
			},
		}),
	)
	.pipe(app.gulp.dest(app.path.build.js))
	.pipe(app.plugins.browserSync.stream());

export default js;
