var babelify   = require('babelify');
var browserify = require('browserify');
var buffer     = require('vinyl-buffer');
var eslint     = require('gulp-eslint');
var gulp       = require('gulp');
var jadeify    = require('jadeify');
var rename     = require('gulp-rename');
var source     = require('vinyl-source-stream');
var stylus     = require('gulp-stylus');
var uglify     = require('gulp-uglify');

var config = {
  browserify: {
    fileName: 'app.js',
    extensions: ['.js'],
    transform: [babelify, jadeify]
  }
}

var paths = {
  src: {
    eslint: './client/src/es6/**/*.js',
    js    : './client/src/es6/app.js',
    styl  : './client/src/stylus/main.styl',
    html  : './client/src/html/**/*.html'
  },
  build: {
    js    : './client/build/js/',
    css   : './client/build/css/',
    html  : './client/build/html/'
  }
}

gulp.task('eslint', function () {
  return gulp
    .src(paths.src.eslint)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('build:js', ['eslint'], function () {
  return browserify({
    entries: paths.src.js,
    debug: true,
    extensions: config.browserify.extensions,
    transform: config.browserify.transform
  }).bundle()
    .pipe(source(config.browserify.fileName))
    .pipe(buffer())
    .pipe(gulp.dest(paths.build.js))
});

gulp.task('build:css', function () {
  gulp.src(paths.src.css)
    .pipe(stylus())
    .pipe(rename('style.css'))
    .pipe(gulp.dest(paths.build.css))
});

gulp.task('watch', function () {
  gulp.watch([paths.src.eslint], ['build:js']);
  gulp.watch([paths.src.css], ['build:css'])
});

gulp.task('build', ['build:css', 'build:js']);

gulp.task('default', ['build', 'watch']);