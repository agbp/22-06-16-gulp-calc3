/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import app from '../gulpApp.js';

export const otfToTtf = () => app.gulp
	.src(`${app.path.srcFolder}/fonts/*.otf`, {})
	.pipe(
		app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'IMAGES *.otf',
				message: 'Error: <%= error.message %>',
			}),
		),
	)
	.pipe(fonter({ formats: ['ttf'] }))
	.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));

export const ttfToWoff = () => app.gulp
	.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
	.pipe(
		app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'IMAGES *.ttf',
				message: 'Error: <%= error.message %>',
			}),
		),
	)
	.pipe(fonter({ formats: ['woff'] }))
	.pipe(app.gulp.dest(app.path.build.fonts))
	.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
	.pipe(ttf2woff2())
	.pipe(app.gulp.dest(app.path.build.fonts));

export const fontsStyle = () => {
	const fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
	fs.readdir(app.path.build.fonts, (err, fontFiles) => {
		if (fontFiles) {
			if (!fs.existsSync(fontsFile)) {
				fs.writeFile(fontsFile, '');
				let newFileOnly;
				for (let i = 0; i < fontFiles.length; i += 1) {
					const fontFileName = fontFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						const fontName = fontFileName.split('-')[0] ?? fontFileName;
						let fontWeight = fontFileName.split('-')[1] ?? fontFileName;
						switch (fontWeight.toLowerCase()) {
							case 'thin':
							case 'hairline':
								fontWeight = 100;
								break;
							case 'extralight':
							case 'ultralight':
								fontWeight = 200;
								break;
							case 'ligh':
								fontWeight = 300;
								break;
							case 'medium':
								fontWeight = 500;
								break;
							case 'semibold':
							case 'demibold':
								fontWeight = 600;
								break;
							case 'bold':
								fontWeight = 700;
								break;
							case 'extrabold':
							case 'ultrabold':
								fontWeight = 800;
								break;
							case 'black':
							case 'heavy':
								fontWeight = 900;
								break;

							default:
								fontWeight = 400;
								break;
						}
						fs.appendFile(
							fontsFile,
							`@font-face {\n\tfont-family: ${fontName};\n\tfont-display:swap;\n\tsrc: url(../fonts/${fontFileName}.woff2) format("woff2"), url(../fonts/${fontFileName}.woff) format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
						);
						newFileOnly = fontFileName;
					}
				}
			} else {
				console.warn(
					'Файл scss/fonts.scss уже существует, для обновления нужно его удалить!',
				);
			}
		}
	});
	return app.gulp.src(app.path.srcFolder);
};
