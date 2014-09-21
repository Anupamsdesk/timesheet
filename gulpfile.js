var gulp = require('gulp');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var webserver = require('gulp-webserver');
var clean = require('gulp-clean');
var stylish = require('jshint-stylish');

var config = {
  devServer: {
    port: 8000,
    livereload: true,
    directoryListing: true,
    //this is the default file to be served
    //fallback: 'index.html'
  }
};

gulp.task('lint', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe(jshint.reporter('fail'));
});

gulp.task('watch-js', function () {
  return gulp.watch('app/js/**/*.js', ['lint']);
});
/* Delete compiled css files */
gulp.task('clean-css', function () {
  return gulp.src('app/css/*.css')
    .pipe(clean());
});
/* Compile less to css */
gulp.task('build-less', ['clean-css'], function () {
  return gulp.src(['app/css/main.less'])
    .pipe(less({compress: true}))
    .pipe(gulp.dest('app/css'));
});
/*Watch for changes in less sources */
gulp.task('watch-less', ['build-less'], function () {
  gulp.watch('app/css/**/*.less', ['build-less']);
});

gulp.task('serve', ['watch-less', 'watch-js'], function () {
  gulp.src('app')
    .pipe(webserver(config.devServer));
});

gulp.task('default', ['serve'], function () {
  console.log('default task');
});