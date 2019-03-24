const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('default', gulp.series(watch));

//// Functions
// Compile HTML
function compileHTML() {
    return gulp
        .src('src/**/*.pug')
        .pipe(pug(
            {
                pretty: true
            }
        ))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
}

// Compile SASS/SCSS to CSS
function compileSass() {
    return gulp
        .src('src/sass/**/*.scss')
        .pipe(sass(
            {
                outputStyle: 'compressed'
            }
        ).on('error', sass.logError))
        .pipe(autoprefixer('last 5 version', 'ie9'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

// Watch
function watch() {
    browserSync.init({
        server: {
            baseDir: './dist/pug/'
        }
    });

    gulp.watch('./src/pug/**/*.pug', compileHTML);
    gulp.watch('./src/pug/**/*.pug').on('change',browserSync.reload );
    gulp.watch('.src/sass/**/*.scss', compileSass);
}

//// Exporting tasks
exports.compileHTML = compileHTML;
exports.compileSass = compileSass;
exports.w = watch;