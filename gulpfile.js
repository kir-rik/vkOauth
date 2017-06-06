const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const concat = require('gulp-concat');

gulp.task('front_css', () => gulp.src('./client/css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./public/css')));

gulp.task('nodemon', (cb) => {
    let called = false;
    return nodemon({
        script: 'dist/bundle.js',
    })
    .on('start', () => {
        if (!called) { cb(); }
        called = true;
    });
});

gulp.task('browser-sync', ['nodemon'], () => {
    browserSync({
        proxy: 'http://localhost:3000',
        port: 4000,
    });
});

gulp.task('default', ['browser-sync', 'front_css'], () => {
});
