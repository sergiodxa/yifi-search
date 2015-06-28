import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import jadeify from 'jadeify';
import minifyCSS from 'gulp-minify-css';
import rename from 'gulp-rename';
import source from 'vinyl-source-stream';
import stylus from 'gulp-stylus';
import uglify from 'gulp-uglify';

const config = {
  browserify: {
    fileName: 'app.js',
    extensions: ['.js'],
    transform: [jadeify, babelify]
  }
}

const paths = {
  src: {
    eslint: './src/es6/**/*.js',
    js    : './src/es6/app.js',
    stylus: './src/stylus/**/*.styl',
    styles: './src/stylus/main.styl',
    jade  : './src/jade/**/*.jade'
  },
  build: {
    js    : './build/js/',
    css   : './build/css/'
  }
}

gulp.task('eslint', () => {
  return gulp
    .src(paths.src.eslint)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('build:js', ['eslint'], () => {
  return browserify({
    entries: paths.src.js,
    debug: true,
    extensions: config.browserify.extensions,
    transform: config.browserify.transform
  }).bundle()
    .pipe(source(config.browserify.fileName))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.build.js))
});

gulp.task('build:css', () => {
  gulp.src(paths.src.styles)
    .pipe(stylus())
    .pipe(rename('style.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.build.css))
});

gulp.task('watch', () => {
  gulp.watch([paths.src.eslint, paths.src.jade], ['build:js']);
  gulp.watch([paths.src.stylus], ['build:css'])
});

gulp.task('build', ['build:css', 'build:js']);

gulp.task('default', ['build', 'watch']);