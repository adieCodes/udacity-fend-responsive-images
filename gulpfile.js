var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
var rename = require('gulp-rename');

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("**/*.html").on('change', browserSync.reload);
  gulp.watch("**/*.css").on('change', browserSync.reload);
});

gulp.task('images', function(){
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
    suffix: "-960"
  }))
  // Move to /images_dist
  .pipe(gulp.dest('images_dist'))
});
