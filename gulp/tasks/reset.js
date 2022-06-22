/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import del from 'del';
import app from '../gulpApp.js';

const reset = () => del(app.path.clean);

export default reset;
