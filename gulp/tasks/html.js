/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import fileinclude from 'gulp-file-include';
import webpHtmlNoSvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import app from '../../gulpfile.js';

const html = () => app.gulp
	.src(app.path.src.html)
	.pipe(
		app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'HTML',
				message: 'Error: <%= error.message %>',
			}),
		),
	)
	.pipe(fileinclude())
	.pipe(app.plugins.replace(/@img\//g, 'img/'))
	.pipe(app.plugins.if(app.isBuild, webpHtmlNoSvg()))
	.pipe(
		app.plugins.if(
			app.isBuild,
			versionNumber({
				value: '%DT%',
				append: {
					key: '_v',
					cover: 0,
					to: ['css', 'js'],
				},
				output: {
					file: 'gulp/version.json',
				},
			}),
		),
	)
	.pipe(app.gulp.dest(app.path.build.html))
	.pipe(app.plugins.browserSync.stream());

export default html;
