'use strict'

import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';

gulp.task('transpile', () => {
  return browserify('src/index.jsx')
    .transform('babelify')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', ['transpile'], () => {
  gulp.watch('src/**/*.jsx', ['transpile']);
});

gulp.task('default', ['transpile']);
