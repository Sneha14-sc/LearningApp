
/**
 * Created by Dell on 2/2/2017.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
//var ngAnnotate = require('gulp-ng-annotate')

gulp.task('clientJs', function () {
    gulp.src([
            '../client/lib/ng-translate/angular-translate.min.js',
            '../client/lib/ng-translate/angular-translate-loader-static-files.min.js',
            '../client/lib/d3.min.js',
            '../client/lib/c3.min.js',
            '../client/lib/c3-angular.min.js',
            // '../client/lib/c3.min.css',
            '../client/lib/ng-translate/angular-translate.min.js',
            '../client/src/common/language.module.js',
            '../client/src/hxc3jsChart/c3jsChart.module.js',
            '../client/src/hxLearningApp/learningApp.module.js',
            //'../client/src/admin/hxPOSAdmin.module.js',
            '../client/src/**/**/*.js',
           '../client/src/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('hxPOSAdmin.js'))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../client/build'));
});

var less = require('gulp-less');
var path = require('path');
gulp.task('index_css', function () {
    return gulp.src('../client/css/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../client/build'));
});
