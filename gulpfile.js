const { src, dest, watch, series } = require("gulp");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");

const scripts = ["./src/js/*.js"];
const styles = ["./src/scss/*.scss"];

const scriptTask = (cb) => {
  src(scripts)
    // .pipe(uglify())
    .pipe(concat("all.js"))
    .pipe(dest("./app/js/"))
    .pipe(browserSync.stream());
  cb();
};

const styleTask = (cb) => {
  src(styles)
    .pipe(sass())
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./app/css/"))
    .pipe(browserSync.stream());
  cb();
};

const serve = (cb) => {
  browserSync.init({
    server: "./app/",
  });

  watch("./src/scss/*.scss", styleTask);
  watch("./src/js/*.js", scriptTask);
  watch("./app/*.html").on("change", browserSync.reload);
  cb();
};

exports.serve = series(styleTask, scriptTask, serve);
exports.default = series(styleTask, scriptTask);
