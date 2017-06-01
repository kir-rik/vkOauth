const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const webpack = require('webpack-stream');

const BROWSER_SYNC_RELOAD_DELAY = 1000;

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

gulp.task('css', () => gulp.src('public/**/*.css')
    .pipe(browserSync.reload({ stream: true })));

gulp.task('bs-reload', () => {
    browserSync.reload();
});

gulp.task('default', ['browser-sync'], () => {
    gulp.watch('public/**/*.js', ['js', browserSync.reload]);
    gulp.watch('public/**/*.css', ['css']);
    gulp.watch('public/**/*.html', ['bs-reload']);
    return gulp.src('src/entry.js')
        .pipe(webpack())
        .pipe(gulp.dest('dist/'));
});
