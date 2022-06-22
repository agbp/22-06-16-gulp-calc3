/* eslint-disable import/no-cycle */
import copy from './gulp/tasks/copy.js';
import reset from './gulp/tasks/reset.js';
import html from './gulp/tasks/html.js';
import server from './gulp/tasks/server.js';
import scss from './gulp/tasks/scss.js';
import js from './gulp/tasks/js.js';
import images from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import svgSprite from './gulp/tasks/svgSprite.js';
import zip from './gulp/tasks/zip.js';
import ftp from './gulp/tasks/ftp.js';
import app from './gulp/gulpApp.js';

function watcher() {
	app.gulp.watch(app.path.watch.files, copy);
	app.gulp.watch(app.path.watch.html, html);
	app.gulp.watch(app.path.watch.scss, scss);
	app.gulp.watch(app.path.watch.js, js);
	app.gulp.watch(app.path.watch.images, images);
}

const fonts = app.gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = app.gulp.series(
	fonts,
	app.gulp.parallel(copy, html, scss, js, images, svgSprite),
);

const dev = app.gulp.series(reset, mainTasks, app.gulp.parallel(server, watcher));
const build = app.gulp.series(reset, mainTasks);
const deployZip = app.gulp.series(reset, mainTasks, zip);
const deployFtp = app.gulp.series(reset, mainTasks, ftp);

export {
	dev, build, deployZip, deployFtp,
};

app.gulp.task('default', dev);
