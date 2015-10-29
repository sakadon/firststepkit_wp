// require libs
var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var coffee = require('gulp-coffee');
var jsmin = require('gulp-jsmin');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var data = require('gulp-data');


// SASS Compile for PC
gulp.task( 'sass', function() {
    gulp.src( './src/scss/*.scss' )
	.pipe( plumber() )
    .pipe( sass() )
    .pipe( autoprefixer([
		"last 2 version",
		"ie 8",
		"ie 7",
		"Android",
		"iOS",
		"ChromeAndroid",
		"FirefoxAndroid"
	]) )
	.pipe( gulp.dest('./public_html/css') )
    .pipe( csso() )
    .pipe( rename({
        suffix: '.min'
    }) )
    .pipe( gulp.dest('./public_html/css') )
    .pipe( browserSync.reload({
		stream: true
	}) );
});


// JS Compress
gulp.task( 'jscomp', function(){
	gulp.src( './src/js/*.js' )
    .pipe( jsmin() )
    .pipe( rename({
        suffix: '.min'
    }) )
    .pipe( gulp.dest( './public_html/js' ))
    .pipe( browserSync.reload({
        stream: true
    }) );
});


// Coffee compile to js
gulp.task( 'coffee', function(){
	gulp.src( './src/js/*.coffee' )
    .pipe( coffee() )
    .pipe( gulp.dest( './src/js' ))
});


// Jade compile to html
gulp.task( 'jade', function() {
    gulp.src( './src/jade/*.jade' )
    .pipe( data( function (file) {
        return { 'meta': require('./src/jade/meta.json')};
    }) )
    .pipe( plumber() )
    .pipe( jade({
        pretty: true
    }) )
    .pipe( gulp.dest('./public_html') )
    .pipe( browserSync.reload({
        stream: true
    }) );
});


// Browser sync
gulp.task( 'bs-func', function() {
    browserSync({
        proxy: "localhost"
    });
});
gulp.task( 'bs-reload', function() {
    browserSync.reload();
});


// Gulp watch
gulp.task( 'watch', ['bs-func'], function(){
	
	watch( './src/scss/*.scss', function(){ gulp.start( 'sass' ) });
	watch( './public_html/css/*.css', function(){ gulp.start( 'bs-reload' ) });
    
    watch( './src/jade/*.jade', function(){ gulp.start( 'jade' ) });
    watch( './src/jade/*.json', function(){ gulp.start( 'jade' ) });
	
    watch( './public_html/*.html', function(){ gulp.start( 'bs-reload' ) });
	watch( './public_html/*.php', function(){ gulp.start( 'bs-reload' ) });
	
    watch( './src/js/*.js', function(){ gulp.start( 'jscomp' ) });
	watch( './src/js/*.coffee', function(){ gulp.start( 'coffee' ) });
    watch( './public_html/js/*.js', function(){ gulp.start( 'bs-reload' ) });
	
	watch( './public_html/img/*.png', function(){ gulp.start( 'bs-reload' ) });
	watch( './public_html/img/*.gif', function(){ gulp.start( 'bs-reload' ) });
	watch( './public_html/img/*.jpg', function(){ gulp.start( 'bs-reload' ) });

});

