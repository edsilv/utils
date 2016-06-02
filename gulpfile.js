var c = require('./gulpfile.config');
var config = new c();
var del = require('del');
var gulp = require('gulp');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');
var tasks = requireDir('./tasks');
var ts = require('gulp-typescript');

gulp.task('default', function(cb) {
    runSequence('clean:dist', 'build', 'minify', 'prependHeaders', cb);
});