import gulp from 'gulp';
import { path } from './gulp/config/path.js';

global.app = {
    path: path,
    gulp: gulp,
}

import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { htmlCopy } from './gulp/tasks/html.js';

function watcher() {
    gulp.watch(app.path.watch.files,copy);
    gulp.watch(app.path.watch.html,htmlCopy);
}

const mainTasks = gulp.parallel(copy,htmlCopy);

const dev = gulp.series(reset, mainTasks, watcher);

gulp.task('default',dev);