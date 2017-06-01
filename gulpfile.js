const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const BROWSER_SYNC_RELOAD_DELAY = 1000;

gulp.task('nodemon', function (cb) {      
    let called = false;
    return nodemon({ 
        script: 'index.js'
    })  
    .on('start', function () {      
        if (!called) { cb(); }
        called = true;
    })
    .on('restart', function () {      
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, BROWSER_SYNC_RELOAD_DELAY);
    })  
});

gulp.task('browser-sync', ['nodemon'], function () {

    browserSync({
        proxy: 'http://localhost:3000',
        port: 4000
    });

});

gulp.task('js',  function () {
  return gulp.src('public/**/*.js')
});

gulp.task('css', function () {
  return gulp.src('public/**/*.css')
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['browser-sync'],  function (cb) {
    gulp.watch('public/**/*.js',   ['js', browserSync.reload]);
    gulp.watch('public/**/*.css',  ['css']);
    gulp.watch('public/**/*.html', ['bs-reload']);
});
