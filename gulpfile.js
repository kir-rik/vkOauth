const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const concat = require('gulp-concat');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

const BROWSER_SYNC_RELOAD_DELAY = 1000;

gulp.task('front_scripts', () => gulp.src('./client/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./public/js')));

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
    })
    .on('restart', () => {
        setTimeout(() => {
            browserSync.reload({
                stream: false,
            });
        }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], () => {
    browserSync({
        proxy: 'http://localhost:3000',
        port: 4000,
    });
});

gulp.task('js', () => gulp.src('public/js/*.js'));

gulp.task('css', () => gulp.src('public/css/*.css')
    .pipe(browserSync.reload({ stream: true })));

gulp.task('bs-reload', () => {
    browserSync.reload();
});

gulp.task('webpack', () => gulp.src('./index.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist/')));

gulp.task('default', ['browser-sync'], () => {
    gulp.watch('client/js/*.js', ['js', 'front_scripts', browserSync.reload]);
    gulp.watch('client/css/*.css', ['css', 'front_css']);
    gulp.watch('public/pages/*.html', ['bs-reload']);
    // return gulp.src('./index.js')
    //     .pipe(webpack(webpackConfig))
    //     .pipe(gulp.dest('dist/'));
});
