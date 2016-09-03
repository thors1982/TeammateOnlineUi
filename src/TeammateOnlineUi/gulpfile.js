/// <binding AfterBuild='clean, moveNpmFiles' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');

var paths = {
    appDest: "./wwwroot/app",

    npmSrc: "./node_modules/",
    libsDest: "./wwwroot/lib/node",

    bootstrapSrc: "bootstrap/**/*",
    bootstrapDest: "./wwwroot/lib/bootstrap",
    fontawesomeSrc: "font-awesome/**/*",
    fontawesomeDest: "./wwwroot/lib/font-awesome",
    jquerySrc: "jquery/**/*",
    jqueryDest: "./wwwroot/lib/jquery",

    angularSrc: './@angular/**/*',
    angularDest: './wwwroot/lib/@angular',

    rxSrc: "./rxjs/**/*",
    rxDest: "./wwwroot/lib/rxjs"
};

var npmFilesToMove = [
    paths.npmSrc + 'core-js/client/shim.min.js',
    paths.npmSrc + 'core-js/client/shim.min.js.map',
    paths.npmSrc + 'zone.js/dist/zone.js',
    paths.npmSrc + 'reflect-metadata/Reflect.js',
    paths.npmSrc + 'reflect-metadata/Reflect.js.map',
    paths.npmSrc + 'systemjs/dist/system.src.js',

   paths.npmSrc + '/oidc-token-manager/dist/oidc-token-manager.js',
   paths.npmSrc + '/spark-md5/spark-md5.min.js',
];

gulp.task('moveJsFiles', function () {
    return gulp.src(npmFilesToMove).pipe(gulp.dest(paths.libsDest));
});

gulp.task('moveBootstrap', function () {
    return gulp.src([paths.npmSrc + paths.bootstrapSrc]).pipe(gulp.dest(paths.bootstrapDest));
});

gulp.task('moveFontAwesome', function () {
    return gulp.src([paths.npmSrc + paths.fontawesomeSrc]).pipe(gulp.dest(paths.fontawesomeDest));
});

gulp.task('moveJQuery', function () {
    return gulp.src([paths.npmSrc + paths.jquerySrc]).pipe(gulp.dest(paths.jqueryDest));
});

gulp.task('moveRx', function () {
    return gulp.src([paths.npmSrc + paths.rxSrc]).pipe(gulp.dest(paths.rxDest));
});

gulp.task('moveAngular', function () {
    return gulp.src([paths.npmSrc + paths.angularSrc]).pipe(gulp.dest(paths.angularDest));
});

gulp.task('moveSystemJsConfig', function () {
    return gulp.src(['./app/systemjs.config.js']).pipe(gulp.dest(paths.appDest));
});

gulp.task('moveNpmFiles', ['moveJsFiles', 'moveBootstrap', 'moveFontAwesome', 'moveJQuery', 'moveRx', 'moveAngular', 'moveSystemJsConfig']);

// Clean tasks
gulp.task("cleanLibsFolder", function () {
    return gulp.src(paths.libsDest).pipe(clean()); // Delete everything in 'wwwroot/lib'
});

gulp.task("cleanAppFolder", function () {
    return gulp.src(paths.appDest).pipe(clean()); // Delete everything in 'wwwroot/app'
});

// Live reload for browser
gulp.task('liveReload', function () {
    // Change the filepath, when you want to live reload a different page in your project.
    livereload.reload("./wwwroot/index.html");
});
// This task should be run, when you want to reload the webpage, when files change on disk.
gulp.task('reloadWatch', function () {
    livereload.listen();
    //gulp.watch('./Client/**/*.js', ['reload']);
    gulp.watch(['./wwwroot/app/**/*.js', './wwwroot/**/*.html'], ['liveReload']);
});

gulp.task('clean', ['cleanLibsFolder']);

gulp.task('default', ['moveNpmFiles', 'reloadWatch']);
