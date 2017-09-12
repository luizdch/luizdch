var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var plumber = require('gulp-plumber')
var stylus = require('gulp-stylus')
var autoprefixer = require('gulp-autoprefixer')
var combineMq = require('gulp-combine-mq')
var include = require("gulp-include")
var browserSync = require('browser-sync').create()

gulp.task('serve', ['css', 'js'], function() {
   browserSync.init({
     port: 3006,
      server: {
         baseDir: "./"
      },
      ui: {
         port: 8080
      }
   });

   gulp.watch("private/stylus/**/*.styl", ['css'])
   gulp.watch("*.html").on('change', browserSync.reload)
   gulp.watch("private/js/**/*.js", ['js'])
})

gulp.task('css', function() {
   return gulp.src("private/stylus/bundles/*.styl")
   .pipe(sourcemaps.init())
   .pipe(plumber())
   .pipe(stylus())
   .pipe(combineMq())
   .pipe(autoprefixer({
      browsers: ['last 3 versions']
   }))
   // .pipe(sourcemaps.write())
   .pipe(gulp.dest("public/css"))
   .pipe(browserSync.stream())
})

gulp.task('js', function() {
  return gulp.src('private/js/bundles/*.js')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(include())
   //  .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream())
});

gulp.task('default', ['serve'])
