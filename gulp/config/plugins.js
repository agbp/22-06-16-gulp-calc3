import replace from "gulp-replace";
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import rename from 'gulp-rename';

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browserSync: browserSync,
    rename: rename,
}