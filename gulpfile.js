import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

export const app = {
	isBuild: process.argv.includes("--build"),
	path: path,
	gulp: gulp,
	plugins: plugins,
};

import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprite } from "./gulp/tasks/svgSprite.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

function watcher() {
	gulp.watch(app.path.watch.files, copy);
	gulp.watch(app.path.watch.html, html);
	gulp.watch(app.path.watch.scss, scss);
	gulp.watch(app.path.watch.js, js);
	gulp.watch(app.path.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(
	fonts,
	gulp.parallel(copy, html, scss, js, images, svgSprite)
);

const dev = gulp.series(reset, mainTasks, gulp.parallel(server, watcher));
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, mainTasks, zip);
const deployFtp = gulp.series(reset, mainTasks, ftp);

export { dev, build, deployZip, deployFtp };

gulp.task("default", dev);

