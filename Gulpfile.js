const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require("gulp-pug");
const del = require("del");

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
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
    cb();
}

const html = cb => {
    gulp.src("./views/*.pug")
    .pipe(pug({}))
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
    cb();
}

const static = cb => {
    gulp.src("./?(js|assets)/**/*.*")
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
    cb();
}

const clean = cb => {
    del(["dist/**/*"])
    cb();
}

const serve = cb => {
    browserSync.init({
        server: "./dist",
        open: false,
        port: 8080
    })
    
    gulp.watch('./scss/**/*.scss', css).on('change', browserSync.reload);
    gulp.watch('./views/**/*.pug', html).on('change', browserSync.reload);
    gulp.watch('./?(js|assets)/**/*.*', static).on('change', browserSync.reload);
    cb();
}

exports.default = serve;
exports.clean = clean;
exports.compile = gulp.series(html, css, static);