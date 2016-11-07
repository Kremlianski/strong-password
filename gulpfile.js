var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    jade = require('gulp-pug'),
    csso = require('gulp-csso');


gulp.task('less', function () {
  return gulp.src('src/less/strong-password.less')
    .pipe(less())
    .pipe(gulp.dest('src/css/'))
    .pipe(gulp.dest('dest/css/'))
    .pipe(rename(function(path){
      path.basename += '.min';
      return path;
   }))
    .pipe(csso())
    .pipe(gulp.dest('dest/css/'));
});

var path = 'src/coffee/';
var files = [
  path + 'classes/core.coffee',
  path + 'classes/seq.coffee',
  path + 'classes/defaults.coffee',
  path + 'classes/position.coffee',
  path + 'classes/popover-core.coffee',
  path + 'strongpass.coffee'
  
];


gulp.task('coffee', function () {
  return gulp.src(files)
    .pipe(concat('strong-password.coffee'))
    .pipe(coffee({
      bare: false
    }))
    .pipe(gulp.dest('src/js/'))
    .pipe(gulp.dest('dest/js/'))
    .pipe(rename(function(path){
      path.basename += '.min';
      return path;
   }))
    .pipe(uglify())
    .pipe(gulp.dest('dest/js/'));
});

gulp.task('default', ['less', 'coffee']);

//API html from pug:
gulp.task('jade', function () {
  return gulp.src('documents/jade/*.pug')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('documents/'));
});