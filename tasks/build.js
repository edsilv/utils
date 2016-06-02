var c = require('../gulpfile.config');
var config = new c();
var gulp = require('gulp');
var merge = require('merge2');
var ts = require('gulp-typescript');

gulp.task('build', function() {
    var tsResult = gulp.src(confg.tsSrc)
        .pipe(ts(config.tsConfig));

    return eventStream.merge(
        tsResult.dts.pipe(gulp.dest(config.dist)),
        tsResult.js.pipe(gulp.dest(config.dist))
    );
});