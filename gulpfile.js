const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');

gulp.task('default', () => {
    return gulp.src('index.js')
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(browserify())
        .pipe(gulp.dest('dist'));
});
