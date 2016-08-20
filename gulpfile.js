const gulp = require('gulp');
const babel = require('gulp-babel');
//const browserify = require('gulp-browserify');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const concat = require('gulp-concat-util');

var babelify = require("babelify");
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var browserify = require("browserify");

gulp.task('babel', () => {
    /**return gulp.src('./src/*.jsx')
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(browserify("./src/App.jsx", { entries: "./src/"}))
        .pipe(concat("bundle.js"))
        .pipe(gulp.dest('dist'));**/
        var bundler = browserify("./src/App.jsx", { debug: true, cache: {}, packageCache: {}, fullPaths: true, extensions: ['.jsx'] })
        .transform(babelify, { presets: ['es2015', 'react']});

        function rebundle() {
          bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dist'));
        }
        rebundle();
});

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
    gulp.watch('./sass/*.scss', ['sass']);
    gulp.watch('./src/*.jsx', ['babel']);
});

gulp.task('start', function () {
    nodemon({
        script: 'server.js',
        ext: 'js html'
    });
});

// default task
gulp.task('default',
    ['sass', 'babel', 'watch', 'start']
);
