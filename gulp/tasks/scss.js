/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import webpCss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import app from '../gulpApp.js';

const sass = gulpSass(dartSass);

const scss = () => app.gulp
	.src(app.path.src.scss, { sourcemaps: !app.isBuild })
	.pipe(
		app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'SCSS',
				message: 'Error: <%= error.message %>',
			}),
		),
	)
	.pipe(app.plugins.replace(/@img\//g, '../img/'))
	.pipe(
		sass({
			outputStyle: 'expanded',
		}),
	)
	.pipe(groupCssMediaQueries())
	.pipe(
		webpCss({
			webpClass: '.webp',
			noWebpClass: '.no-webp',
		}),
	)
	.pipe(
		autoprefixer({
			grid: true,
			ovverideBrowserslist: ['last 3 versions'],
			cascade: true,
		}),
	)
	.pipe(app.gulp.dest(app.path.build.css)) // comment it for prod
	.pipe(cleanCss())
	.pipe(
		app.plugins.rename({
			extname: '.min.css',
		}),
	)
	.pipe(app.gulp.dest(app.path.build.css))
	.pipe(app.plugins.browserSync.stream());

export default scss;
