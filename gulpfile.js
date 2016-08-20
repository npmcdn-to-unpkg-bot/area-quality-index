const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const concat = require('gulp-concat-util');

gulp.task('babel', () => {
    return gulp.src('src/App.jsx')
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(browserify())
        .pipe(concat("bundle.js"))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
    gulp.watch('./sass/*.scss', ['sass']);
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
