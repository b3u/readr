const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss')

const css = cb => {
    gulp.src('./scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(postcss([
        require('autoprefixer'),
        require('cssnano')
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream())
    cb();
}

const serve = cb => {
    browserSync.init({
        server: "./",
        open: false,
        port: 8080
    })
    
    gulp.watch('./scss/**/*.scss', css).on('change', browserSync.reload);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
    cb();
}

exports.default = serve;
exports.pack = css;