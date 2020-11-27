var gulp = require("gulp"),
  scss = require("gulp-sass"),
  browserSync = require("browser-sync"),
  webpack = require("webpack"),
  webpackStream = require("webpack-stream"),
  concat = require("gulp-concat"),
  cssnano = require("gulp-cssnano"),
  rename = require("gulp-rename"),
  sourcemaps = require("gulp-sourcemaps"),
  del = require("del"),
  imagemin = require("gulp-imagemin"),
  workbox = require("workbox-build"),
  eslint = require("gulp-eslint"),
  pngquant = require("imagemin-pngquant"),
  cache = require("gulp-cache"),
  cachebust = require("gulp-cache-bust"),
  pug = require("gulp-pug"),
  rename = require("gulp-rename"),
  flatten = require("gulp-flatten"),
  autoprefixer = require("gulp-autoprefixer");

var domain = "";
var pageSource = "src";
var styleSource = "assets/styles";
var scriptSource = "assets/js";
var seoSource = "assets/seo";
var imageSource = "assets/images";
var fontSource = "assets/fonts";
var downloadSource = "assets/downloads";
var faviconSource = "assets/favicons";

var pageDist = "dist";
var styleDist = "dist/styles";
var scriptDist = "dist/js";
var seoDist = "dist";
var imageDist = "dist/images";
var fontDist = "dist/fonts";
var downloadDist = "dist/downloads";

var mode = "development";

//
// Compile PUG to HTML
//
function buildHtml(done) {
  var YOUR_LOCALS = {};
  gulp
    .src([pageSource + "/**/*.pug", "!" + pageSource + "/includes/**"])
    .pipe(
      pug({
        locals: YOUR_LOCALS,
        pretty: mode == "development" ? true : false,
      })
    )

    //
    // If you want to put all files under one directory, uncomment below
    //
    /*
    .pipe(rename(function(path) {
      //console.log(path);
      // Skip index.pug at root
      if (path.dirname === "." && path.basename === "index") {
        return;
      }
      // Change file name to directory name
      path.basename = path.dirname;
    }))
    // Then flatten directory structure
    .pipe(flatten())
    */
    //
    //
    //

    .pipe(gulp.dest(pageDist));
  done();
}

//
// Compile SCSS task
//
function styles() {
  return gulp
    .src([styleSource + "/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(scss().on("error", scss.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(concat("styles.min.css"))
    .pipe(
      cssnano({
        discardComments: {
          removeAll: true,
        },
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(styleDist));
}

//
// Script lint task
//
function jslint() {
  return gulp
    .src([scriptSource + "/**/*.js"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

//
// Compile script task
//
function scripts() {
  var config = require("./webpack.development.js");
  if (mode == "production") {
    config = require("./webpack.production.js");
  }
  return gulp
    .src([scriptSource + "/**/*.js"])
    .pipe(webpackStream(config), webpack)
    .pipe(gulp.dest(scriptDist));
}

//
// Generate service worker script with workbox
// https://developers.google.com/web/tools/workbox/guides/generate-complete-sw
// 
function serviceWorker() {
  return workbox.generateSW({
    swDest: pageDist + '/service-worker.js',
    globDirectory: pageDist,
    globPatterns: [
      '**/*.{js,css,html}'
    ]
  });
}

//
// Copy downloads
//
function downloads() {
  return gulp.src(downloadSource + "/**/*").pipe(gulp.dest(downloadDist));
}

//
// Copy favicons
//
function favicons() {
  return gulp.src(faviconSource + "/**/*").pipe(gulp.dest(pageDist));
}

//
// Copy .ebextensions
//
function ebextensions() {
  return gulp.src("./ebextensions/**/*").pipe(gulp.dest("dist/.ebextensions"));
}

//
// Cache bust
//
function cacheBust() {
  return gulp
    .src(pageDist + "/**/*.html")
    .pipe(
      cachebust({
        type: "timestamp",
      })
    )
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
// Copy SEO folder
//
function seo() {
  return gulp.src(seoSource + "/**/*").pipe(gulp.dest(seoDist));
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
              removeViewBox: false,
            },
          ],
          use: [pngquant()],
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
      baseDir: pageDist,
      serveStaticOptions: {
        extensions: ["html"],
      },
    },
    //proxy: domain,
    notify: true,
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
// Set production mode
//
function setProductionMode(done) {
  mode = "production";
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

gulp.task("html", gulp.series(clear, buildHtml));

gulp.task("images", gulp.series(clear, images));

gulp.task("scripts", gulp.series(clear, jslint, scripts));

gulp.task("styles", gulp.series(clear, styles));

gulp.task("favicons", gulp.series(clear, favicons));

gulp.task(
  "build",
  gulp.series(
    setProductionMode,
    clear,
    buildHtml,
    fonts,
    images,
    downloads,
    favicons,
    styles,
    jslint,
    scripts,
    serviceWorker,
    ebextensions,
    cacheBust
  )
);
