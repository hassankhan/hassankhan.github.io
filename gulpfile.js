// Include Gulp
const gulp = require('gulp');

// Include plugins
const autoprefix = require('gulp-autoprefixer');
const cleanCss   = require('gulp-clean-css');
const concat     = require('gulp-concat');
const htmllint   = require('gulp-htmllint');
const htmlmin    = require('gulp-htmlmin');
const imagemin   = require('gulp-imagemin');
const inject     = require('gulp-inject');
const jshint     = require('gulp-jshint');
const rename     = require('gulp-rename');
const sass       = require('gulp-sass');
const stylelint  = require('gulp-stylelint');
const uglify     = require('gulp-uglify');

// Minify images
gulp.task('minify:images', () => {
  return gulp.src('./src/images/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('copy:images', gulp.series('minify:images', () => {
  return gulp.src('./dist/images/*.*')
    .pipe(gulp.dest('./'));
}));

// Lint JS
gulp.task('lint:js', () => {
    return gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Minify JS
gulp.task('minify:js', gulp.series('lint:js', () => {
    return gulp.src('./src/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
}));

// Lint SASS
gulp.task('lint:sass', () => {
    return gulp.src('./src/sass/*.scss')
        .pipe(stylelint({
            reporters: [
                {
                    formatter: 'string',
                    console: true,
                },
            ],
        }));
});

// Compile Sass
gulp.task('compile:sass', gulp.series('lint:sass', () => {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'));
}));

// Minify CSS
gulp.task('minify:css', gulp.series('compile:sass', () => {
    return gulp.src('./dist/css/styles.css')
        .pipe(cleanCss())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('./dist/css'));
}));

// Lint HTML
gulp.task('lint:html', () => {
    return gulp.src('./src/index.html')
        .pipe(htmllint());
});

// Inject assets into HTML
gulp.task('inject', () => {
    return gulp.src('./src/index.html')
        .pipe(inject(gulp.src('./dist/css/styles.min.css'), {
            starttag: '<!-- inject:head:css -->',
            transform: (filePath, file) => {
                // return file contents as string
                return `<style>${file.contents.toString('utf8')}</style>`;
            }
        }))
        .pipe(inject(gulp.src('./dist/js/scripts.min.js'), {
            starttag: '<!-- inject:head:js -->',
            transform: (filePath, file) => {
                // return file contents as string
                return `<script>${file.contents.toString('utf8')}</script>`;
            }
        }))
        .pipe(gulp.dest('./dist'));
});

// Minify HTML
gulp.task('minify:html', gulp.series('inject', () => {
    return gulp.src('./dist/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
        }))
        .pipe(gulp.dest('./'));
}));

gulp.task('default', gulp.parallel('lint:html', 'minify:css', 'minify:js', 'copy:images'));
gulp.task('build', gulp.series('minify:html'));

// Watch files for changes
gulp.task('watch', gulp.series('build', () => {
    gulp.watch('./src/*.html', gulp.series('inject', 'minify:html'));
    gulp.watch('./src/js/*.js', gulp.series('inject', 'minify:html'));
    gulp.watch('./src/sass/*.scss', gulp.series('inject', 'minify:html'));
}));
