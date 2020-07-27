var gulp = require("gulp"),
  scss = require("gulp-sass"),
  browserSync = require("browser-sync"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  cssnano = require("gulp-cssnano"),
  rename = require("gulp-rename"),
  sourcemaps = require("gulp-sourcemaps"),
  del = require("del"),
  imagemin = require("gulp-imagemin"),
  jshint = require("gulp-jshint"),
  pngquant = require("imagemin-pngquant"),
  cache = require("gulp-cache"),
  cachebust = require('gulp-cache-bust'),
  pug = require("gulp-pug"),
  autoprefixer = require("gulp-autoprefixer");

var domain = "";
var pageSource = "src";
var styleSource = "assets/styles";
var scriptSource = "assets/js";
var imageSource = "assets/images";
var fontSource = "assets/fonts";

var pageDist = "dist";
var styleDist = "dist/styles";
var scriptDist = "dist/js";
var imageDist = "dist/images";
var fontDist = "dist/fonts";

//
// Compile PUG to HTML
//
function buildHtml(done) {
  var YOUR_LOCALS = {};
  gulp
    .src([
        pageSource + "/**/*.pug",
        "!" + pageSource + "/includes/**"
      ])
    .pipe(
      pug({
        locals: YOUR_LOCALS,
        pretty: true
      })
    )
    .pipe(gulp.dest(pageDist));
  done();
}

//
// Compile SCSS task
//
function styles() {
  return gulp
    .src(styleSource + "/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(scss().on("error", scss.logError))
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(concat("styles.min.css"))
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(styleDist));
}

//
// Script lint task
//
function jslint() {
  return gulp
    .src(["gulpfile.js", scriptSource + "/**/*.js"])
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(jshint.reporter("fail"));
}

//
// Copy vendor scripts
//
function vendorScripts(done) {
  gulp
    .src(["node_modules/jquery/dist/jquery.min.js"])
    .pipe(gulp.dest(scriptDist + "/vendor"));
  done();
}

//
// Compile script task
//
function scripts() {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.js",
      scriptSource + "/**/*.js"
    ])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat("scripts.min.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(scriptDist));
}

//
// Cache bust
//
function cacheBust() {
  return gulp.src(pageDist + "/**/*.html")
    .pipe(cachebust({
        type: 'timestamp'
    }))
    .pipe(gulp.dest(pageDist));
}

//
// Clean task (clear /dist)
//
function clean() {
  return del.sync(pageDist);
}

//
// Font task
//
function fonts() {
  return gulp.src(fontSource + "/**/*").pipe(gulp.dest("dist/fonts"));
}

//
// Image task
//
function images() {
  return gulp
    .src(imageSource + "/**/*")
    .pipe(
      cache(
        imagemin({
          interlaced: true,
          progressive: true,
          svgoPlugins: [
            {
              removeViewBox: false
            }
          ],
          use: [pngquant()]
        })
      )
    )
    .pipe(gulp.dest(imageDist));
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
  return browserSync({
    server: {
      baseDir: pageDist
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
  gulp.watch(pageSource + "/**/*.pug", gulp.series(buildHtml, reloadBrowser));
  gulp.watch(styleSource + "/**/*.scss", gulp.series(styles, reloadBrowser));
  gulp.watch(
    scriptSource + "/**/*.js",
    gulp.series(jslint, scripts, reloadBrowser)
  );
  gulp.watch(imageSource + "/**/*", gulp.series(images, reloadBrowser));
  gulp.watch(fontSource + "/**/*", gulp.series(fonts, reloadBrowser));
}

//
// Default task
//
gulp.task("default", gulp.parallel(watchChanges, cacheBust, runBrowser));

//
// Build task
//
gulp.task(
  "build",
  gulp.series(
    clear,
    buildHtml,
    fonts,
    images,
    styles,
    jslint,
    scripts,
    vendorScripts,
    cacheBust
  )
);
