var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("**/*.html").on('change', browserSync.reload);
  gulp.watch("**/*.css").on('change', browserSync.reload);
});

gulp.task('images_1920', function(){
  // Get all images in /images_src
  gulp.src("images_src/**/*.+(jpg|png)")
  // Resize images
  .pipe(imageResize({
    width: 1920,
    upscale: false
  }))
  // Minify images
  .pipe(imagemin())
  // Rename images, add appropriate size attributes
  .pipe(rename({
    suffix: "_1920"
  }))
  // Move to /images_dist
  .pipe(gulp.dest('images_dist'))
});

gulp.task('images_960', function(){
  // Get all images in /images_src
  gulp.src("images_src/**/*.+(jpg|png)")
  // Resize images
  .pipe(imageResize({
    width: 960,
    upscale: false
  }))
  // Minify images
  .pipe(imagemin())
  // Rename images, add appropriate size attributes
  .pipe(rename({
    suffix: "_960"
  }))
  // Move to /images_dist
  .pipe(gulp.dest('images_dist'))
});

gulp.task('images_480', function(){
  // Get all images in /images_src
  gulp.src("images_src/**/*.+(jpg|png)")
  // Resize images
  .pipe(imageResize({
    width: 480,
    upscale: false
  }))
  // Minify images
  .pipe(imagemin())
  // Rename images, add appropriate size attributes
  .pipe(rename({
    suffix: "_480"
  }))
  // Move to /images_dist
  .pipe(gulp.dest('images_dist'))
});

gulp.task('build', function(callback){
  runSequence('images_1920', 'images_960', 'images_480', callback)
})
