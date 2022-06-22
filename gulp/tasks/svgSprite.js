/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import gulpSvgSprite from 'gulp-svg-sprite';
import app from '../../gulpfile.js';

const svgSprite = () => app.gulp
	.src(app.path.src.svgIcons)
	.pipe(
		app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'SVG sprite',
				message: 'Error: <%= error.message %>',
			}),
		),
	)
	.pipe(
		gulpSvgSprite({
			mode: {
				stack: {
					sprite: '../icons/icons.svg',
					example: true,
				},
			},
		}),
	)
	.pipe(app.gulp.dest(app.path.build.images))
	.pipe(app.plugins.browserSync.stream());

export default svgSprite;
