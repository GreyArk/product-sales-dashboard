'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var named = require('vinyl-named');

gulp.task('styles', function() {
    return gulp.src('./app/css/main.css')
        .pipe(named())
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 10']
        }))
        .pipe(gulp.dest('./app/dist'))
        .pipe($.size());
});

gulp.task('scripts', function() {
    var webpack = require('webpack-stream');
    return gulp.src('./app/js/main.js')
        .pipe($.plumber())
        .pipe(named())
        .pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest('./app/dist'))
        .pipe($.size());
});

gulp.task('test', function(done) {
    var karma = require('karma');
    karma.server.start({
        configFile: __dirname + '/karma.config.js'
    }, function(exitCode) {
        if (exitCode !== 0) {
            console.error("Tests failed with exit code:" + exitCode);
        }
    });
    done();
});

gulp.task('clean', function() {
    return gulp.src('./app/dist/**/*', {read: false})
        .pipe($.clean());
});

gulp.task('build', ['styles', 'scripts']);

gulp.task('watch', ['build'], function() {
    gulp.watch('./app/css/**/*.css', ['styles']);
    gulp.watch('./app/js/**/*.js', ['scripts']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
