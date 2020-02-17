var gulp = require('gulp'),
  scss = require('gulp-sass'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  jshint = require('gulp-jshint'),
  pngquant = require('imagemin-pngquant'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer');

var domain = '';
var scssSource = 'assets/styles';
var scriptSource = 'assets/js';
var imageSource = 'assets/images';
var fontSource = 'assets/fonts';

var scssDist = 'dist/styles';
var scriptDist = 'dist/js';
var imageDist = 'dist/images';
var fontDist = 'dist/fonts';

//
// Compile SCSS task
//
function styles() {
  return gulp.src(scssSource + '/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(scss().on('error', scss.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(concat('styles.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(scssDist));
}

//
// Script lint task
//
function jslint() {
  return gulp.src([
      'gulpfile.js',
      scriptSource + '/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
}

//
// Compile script task
//
function scripts() {
  return gulp.src([
      'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
      scriptSource + '/**/*.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(scriptDist));
}

//
// Clean task (clear /dist)
//
function clean() {
  return del.sync('dist');
}

//
// Font task
//
function fonts() {
  return gulp.src(fontSource + '/**/*')
    .pipe(gulp.dest('dist/fonts'));
}

//
// Image task
//
function images() {
  return gulp.src(imageSource + '/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/images'));
}

//
// Clear cache
//
function clear() {
  return cache.clearAll();
}


//
// Browser sync task
//
function runBrowser() {
  browserSync({
    server: {
    	baseDir: './'
    },
    //proxy: domain,
    notify: true
  });
}

//
// Reload browser
//
function reloadBrowser(done) {
  browserSync.reload();
  done();
}

//
// Tasks to run as source files are changed
//
function watchChanges() {
  gulp.watch(scssSource + '/**/*.scss', gulp.series(styles));
  gulp.watch(scriptSource + '/**/*.js', gulp.series(jslint, scripts));
  gulp.watch(imageSource + '/**/*', gulp.series(images));
  gulp.watch(fontSource + '/**/*', gulp.series(fonts));
  gulp.watch('**/*.html', gulp.series(reloadBrowser));
}

//
// Default task
//
gulp.task('default', gulp.parallel(watchChanges, runBrowser));

//
// Build task
//
gulp.task('build', gulp.series(clear, fonts, images, styles, jslint, scripts));
