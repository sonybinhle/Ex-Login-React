'use strict';

const gulp = require('gulp');
const del = require('del');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const util = require('gulp-util');

const production = !!util.env.production;

const config = {
  production: production,
  debug : !production,
  destJs: '../public/js',
  destJsFile: 'bundle.js',
  sourceJs: 'js',
  sourceJsFile: 'js/main.js'
};

gulp.task('clean', function(done) {
  del.sync([config.destJs + '/*'], {force: true});
  done();
});

gulp.task('js', function(done) {
  browserify(config.sourceJsFile, {
    debug: config.debug
  })
    .transform(babelify, {
      presets: ["es2015", "react"],
      sourceMaps: false
    })
    .bundle()
    .pipe(source(config.destJsFile))
    .pipe(gulp.dest(config.destJs));
  done();
});

gulp.task('watch', function() {
  gulp.watch(config.sourceJs + '/**/*.js', gulp.series('js'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('js')));

if (config.production) {
  gulp.task('default', gulp.series('build'));
} else {
  gulp.task('default', gulp.series('build', 'watch'));
}