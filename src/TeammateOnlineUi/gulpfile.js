/// <binding BeforeBuild='moveNodeFiles' Clean='cleanNode' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var del = require('del');
var livereload = require('gulp-livereload');

var paths = {
    npmsrc: "./node_modules/",
    nodedest: "./wwwroot/lib/",

    bootstrapsrc: "bootstrap/**/*",
    bootstrapdest: "./wwwroot/lib/bootstrap",
    fontawesomesrc: "font-awesome/**/*",
    fontawesomedest: "./wwwroot/lib/font-awesome",
}

var nodeFilesToMove = [
   paths.npmsrc + '/angular2/bundles/angular2-polyfills.js',
   paths.npmsrc + '/angular2/bundles/router.dev.js',
   paths.npmsrc + '/angular2/bundles/http.dev.js',
   paths.npmsrc + '/systemjs/dist/system.js',
   paths.npmsrc + '/systemjs/dist/system.js.map',
   paths.npmsrc + '/systemjs/dist/system-polyfills.js',
   paths.npmsrc + '/systemjs/dist/system-polyfills.js.map',
   paths.npmsrc + '/rxjs/bundles/Rx.js',
   paths.npmsrc + '/angular2/bundles/angular2.dev.js',
   paths.npmsrc + '/es6-shim/es6-shim.min.js',
   paths.npmsrc + '/es6-shim/es6-shim.map',
   paths.npmsrc + '/angular2/es6/dev/src/testing/shims_for_IE.js',
   paths.npmsrc + '/oidc-token-manager/dist/oidc-token-manager.js',
];

gulp.task('moveNodeFiles', ['moveJsFiles', 'moveBootstrap', 'moveFontAwesome']);

gulp.task('moveJsFiles', function () {
    return gulp.src(nodeFilesToMove).pipe(gulp.dest(paths.nodedest));
});

gulp.task('moveBootstrap', function () {
    return gulp.src([paths.npmsrc + paths.bootstrapsrc]).pipe(gulp.dest(paths.bootstrapdest));
});

gulp.task('moveFontAwesome', function () {
    return gulp.src([paths.npmsrc + paths.fontawesomesrc]).pipe(gulp.dest(paths.fontawesomedest));
});

gulp.task("cleanNode", function () {
    del(paths.nodedest + '**/*');    // Delete everything in 'wwwroot/lib/node'
});

gulp.task('reload', function () {
    // Change the filepath, when you want to live reload a different page in your project.
    livereload.reload("./index.html");
});

// This task should be run, when you want to reload the webpage, when files change on disk.
// This task will only watch JavaScript file changes in the folder "/wwwroot/app" and it's subfolders.
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('./wwwroot/app/**/*.js', ['reload']);
});

gulp.task('default', ['moveNodeFiles', 'watch']);
