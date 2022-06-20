import { app } from "../../gulpfile.js";
import del from "del";
export const reset = () => {
	return del(app.path.clean);
};
