/* eslint-disable import/no-extraneous-dependencies */
import replace from 'gulp-replace';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import rename from 'gulp-rename';
import newer from 'gulp-newer';
import gulpIf from 'gulp-if';

const plugins = {
	replace,
	plumber,
	notify,
	browserSync,
	rename,
	newer,
	if: gulpIf,
};

export default plugins;
