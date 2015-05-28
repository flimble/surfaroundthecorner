'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var less         = require('gulp-less');
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function () {

  var createSourcemap = global.isProd && config.styles.sourcemap;

  return gulp.src(config.styles.src)
    //.pipe(gulpif(createSourcemap, sourcemaps.init())) //generate source maps to original less file
    .pipe(less()) //compile less to css
    //.pipe(gulpif(createSourcemap, sourcemaps.write())) //write the map file
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8')) //adjust css for older to behave as per W3C specs
    .on('error', handleErrors)
    .pipe(gulp.dest(config.styles.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));
});