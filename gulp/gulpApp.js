/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import path from './config/path.js';
import plugins from './config/plugins.js';

const app = {
	isBuild: process.argv.includes('--build'),
	path,
	gulp,
	plugins,
};

export default app;
