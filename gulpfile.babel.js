import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import gcmq from 'gulp-group-css-media-queries';
import gulp from 'gulp';
import jadeify from 'jadeify';
import minifyCSS from 'gulp-minify-css';
import minifyHTML from 'gulp-minify-html';
import rename from 'gulp-rename';
import source from 'vinyl-source-stream';
import stylus from 'gulp-stylus';
import styleInject from 'gulp-style-inject';
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
    jade  : './src/jade/**/*.jade',
    html  : './src/html/index.html'
  },
  build: {
    js    : './build/js/',
    css   : './build/css/',
    html  : './'
  }
}

gulp.task('eslint', () => {
  return gulp
    .src(paths.src.eslint)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('build:js', () => {
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
    .pipe(gcmq())
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.build.css))
});

gulp.task('build:html', ['build:css'], () => {
  gulp.src(paths.src.html)
    .pipe(styleInject())
    .pipe(minifyHTML())
    .pipe(gulp.dest(paths.build.html))
});

gulp.task('watch', () => {
  gulp.watch([paths.src.eslint, paths.src.jade], ['build:js']);
  gulp.watch([paths.src.stylus], ['build:css', 'build:html']);
  gulp.watch([paths.src.html], ['build:html']);
});

gulp.task('build', ['build:css', 'build:html', 'build:js']);

gulp.task('default', ['build', 'watch']);
