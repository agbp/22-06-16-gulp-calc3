import { app } from '../../gulpfile.js';
import fs, { appendFile } from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2'

export const otfToTtf = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`,{})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES *.otf",
                message: 'Error: <%= error.message %>',
            })
        ))
        .pipe(fonter({ formats: ['ttf'] }))
        .pipe(app.gulp.dist(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`,{})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES *.ttf",
                message: 'Error: <%= error.message %>',
            })
        ))
        .pipe(fonter({ formats: ['woff'] }))
        .pipe(app.gulp.dest(app.path.build.fonts))
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(app.path.build.fonts))
}

export const fontsStyle = () => {
    let fontsFile = `${app.path.src.scss}/fonts.scss`;
    fs.readdir(app.path.build.fonts,function (err,fontFiles) {
        if(fontFiles) {
            if(!fs.existsSync(fontsFile)) {
                fs.writeFile(fontsFile,'',cb)
                let newFileOnly;
                for (let i = 0; i < fontsfiles.length; i++) {
                    let fontFileName = fontFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ?? fontFileName;
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
                        fs.appendFile(fontsFile,
                            `@font-dace {\n\tfont-family: ${fontName};\n\tfont-display:swap;\n\tsrc: url(../fonts/${fontFileName}.woff2) format("woff2"), url(../fonts/${fontFileName}.woff)\n\tformat("woff");\n\tfont-eweight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                console.log("Файл scss/fonts.scss уже существует, для обновления файду нужно его удалить!");
            }
        }
    })
    return app.gulp.src(app.path.srcFolder);
    function cb () {}
}

export const fonts = () => {

}