var babelify   = require('babelify');
var browserify = require('browserify');
var buffer     = require('vinyl-buffer');
var eslint     = require('gulp-eslint');
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');

gulp.task('eslint', function () {
  return gulp.src('./app/**/*.jsx')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('build:js', ['eslint'], function () {
  return browserify({
    entries: ['./app/client.jsx'],
    extensions: ['.jsx'],
    transform: [babelify]
  }).bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./app/public'))
});

gulp.task('build', ['build:js']);

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.jsx'], ['build:js']);
});

gulp.task('default', ['build', 'watch']);
