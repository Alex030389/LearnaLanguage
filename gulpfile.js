var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  rigger = require('gulp-rigger'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  cleancss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),

  notify = require('gulp-notify'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps'),

  imagemin = require('gulp-imagemin'),
  imageminJpegRecompress = require('imagemin-jpeg-recompress'),
  pngquant = require('imagemin-pngquant'),
  cache = require('gulp-cache'),

  svgSprite = require('gulp-svg-sprite'),
  svgmin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  replace = require('gulp-replace');

gulp.task('browser-sync', function () {
  browserSync({
    server: 'dist',
    notify: true,
    // open: false,
    // online: false, // Work Offline Without Internet Connection
    // tunnel: true
  })
});

// gulp.task('clean', function () {
//   return del(['dist/css/', 'dist/js/']);
// });

gulp.task('clean', function () {
  return del('dist');
});


gulp.task('html', function () {
  return gulp.src([
      '!src/pages/modules/*.html',
      'src/pages/*.html'
    ])
    .pipe(rigger())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
});

gulp.task('fonts', function () {
  return gulp.src('src/static/fonts/**/*')
    .pipe(gulp.dest('dist/static/fonts/'))
});

gulp.task('styles', function () {
  return gulp.src('src/static/styles/**/*.scss')
    .pipe(sourcemaps.init()) // ======================================== dev
    .pipe(sass({
      outputStyle: 'expanded'
    }).on("error", notify.onError()))
    // .pipe(rename({
    //   suffix: '.min',
    //   prefix: ''
    // }))
    .pipe(concat('styles.min.css')) // вместо rename
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleancss({ // ================================================ build
      level: {
        1: {
          specialComments: 0
        }
      }
    }))
    .pipe(sourcemaps.write()) // ======================================== dev
    .pipe(gulp.dest('dist/static/css/'))
    .pipe(browserSync.stream())
});

// gulp.task('libs', function () {
//   return gulp.src('src/libs/**/*')
//     .pipe(gulp.dest('dist/libs/'))
// });

gulp.task('scripts', function () {
  return gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/svg4everybody/dist/svg4everybody.min.js',
      'node_modules/slick-carousel/slick/slick.min.js',
      'node_modules/selectric/public/jquery.selectric.min.js',
      'node_modules/jquery-validation/dist/jquery.validate.min.js',
      'src/static/js/main.js'
    ])
    .pipe(sourcemaps.init()) // ========================================== dev

    .pipe(concat('scripts.min.js'))

    // .pipe(uglify()) // ================================================ build
    .pipe(sourcemaps.write()) // ========================================= dev
    .pipe(gulp.dest('dist/static/js/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('img', function () {
  return gulp.src([
      '!src/static/images/sprite/**/*',
      'src/static/images/**/*.{png,jpg,svg}'
    ])

    // .pipe(imagemin([
    //   imagemin.gifsicle({interlaced: true}),
    //   imagemin.jpegtran({progressive: true}),
    //   imageminJpegRecompress({
    //     loops: 5,
    //     min: 70,
    //     max: 75,
    //     quality: 'medium'
    //   }),
    //   imagemin.optipng({optimizationLevel: 3}),
    //   pngquant({speed: 5}),
    //   imagemin.svgo()
    // ], {
    //   verbose: true
    // }))

    .pipe(gulp.dest('dist/static/images/'));
});

gulp.task('svg', function () {
  return gulp.src('src/static/images/sprite/svg/**/*.svg')
    // minify svg
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // remove all fill, style and stroke declarations in out shapes
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    // cheerio plugin create unnecessary string '&gt;', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "sprite.svg",
        }
      }
    }))
    .pipe(gulp.dest('dist/static/images/sprite/svg/'));
});


gulp.task('svg:c', function () {
  return gulp.src('src/static/images/sprite/svgc/**/*.svg')
    // minify svg
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // remove all fill, style and stroke declarations in out shapes
    .pipe(cheerio({
      run: function ($) {
        // $('[fill]').removeAttr('fill');
        // $('[stroke]').removeAttr('stroke');
        // $('[style]').removeAttr('style');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    // cheerio plugin create unnecessary string '&gt;', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "sprite.svg",
        }
      }
    }))
    .pipe(gulp.dest('dist/static/images/sprite/svgc/'));
});

gulp.task('watch', function () {
  gulp.watch('src/pages/**/*.html', gulp.series('html'));
  gulp.watch('src/static/styles/**/*.scss', gulp.series('styles'));
  gulp.watch('src/static/js/**/*', gulp.series('scripts'));
});

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel(
    'html',
    'fonts',
    'img',
    'svg',
    'svg:c',
    'styles',
    // 'libs',
    'scripts',
    'browser-sync',
    'watch'
  )));