const gulp = require('gulp');
var exec = require('child_process').exec;
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
// const reload = browserSync.reload;
const rename = require ('gulp-rename');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const image = require('gulp-image');
const changed = require('gulp-changed');
const uglify = require('gulp-uglify');
const lineec = require('gulp-line-ending-corrector');
const htmlmin = require('gulp-htmlmin');

const styleSrc = './src/sass/';
const styleDist = './dist/css/';
const styleWatch = './src/sass/**/*.scss';

const jsSrc = './src/js/*.js';
const jsDist = './dist/js/';
const jsWatch = './src/js/**/*.js';

const htmlWatch = './src/**/*.html'
const imgSrc = './src/images/**/*';
const imgDist = './dist/images/';


const jsFiles = [
    jsSrc
];

//only needed when exporting multiple CSS files
const cssFiles = [
    styleSrc + 'style.css',
];

const sassFiles = [
    styleSrc + 'gulp-main.scss',
    styleSrc + 'main.scss'
];

function css(){
    return gulp.src([styleSrc + 'main.scss'])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 10 versions'))
    .pipe( rename("style.min.css"))   //rename( {suffix: '.test'} ))
    .pipe(sourcemaps.write())
    .pipe(lineec())
    .pipe(gulp.dest(styleDist));
}

//only needed to combine multiple css files
function concatCSS(){
    return gulp.src(cssFiles)
        .pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./maps'))
        .pipe(lineec())
        .pipe(gulp.dest(styleDist));
}


function javascript() {
    return gulp.src(jsSrc)
    // .pipe(concat('main.js')) don't concat for now - until html replace of script tags
    .pipe(uglify())
    .pipe(lineec())
    .pipe(gulp.dest(jsDist))
}

function imgmin() {
    return gulp.src(imgSrc)
    .pipe(changed(imgDist))
    /* imagemin not working */
    // .pipe(imagemin([
    //     imagemin.gifsicle({interlaced: true}),
    //     imagemin.jpegtran({progressive: true}),
    //     imagemin.optipng({optimizationLevel: 5})

    // ]))
    .pipe(image({
        pngquant: true,
        optipng: true,
        zopflipng: true,
        jpegRecompress: true,
        mozjpeg: true,
        guetzli: true,
        gifsicle: true,
        svgo: true,
        // concurrent: 10, /*Unlimited*/
        quiet: false // defaults to false
      }))
    .pipe(gulp.dest(imgDist));
}

function htmlminify(){
    return gulp.src('src/*.html')
      .pipe(htmlmin({ 
          collapseWhitespace: true,
          removeComments: true
        }))
      .pipe(gulp.dest('dist'));
  }
//look at npm install --save-dev gulp-html-replace > using blocks in the HTML

function assets() {
    return gulp.src('./src/assets/*')
        .pipe(gulp.dest('dist/assets'));
}

function imgmove() {
    return gulp.src('./src/images/**/*')
        .pipe(gulp.dest('dist/images'));
}

//Watch when working on DIST folder - use NPM Run Start on Dev
function watch(){
    browserSync.init({
        open: 'external',
        proxy: 'http://localhost/bulmagulp-starter/dist',
        port: 8080,
    });
    // gulp.watch(styleWatch, gulp.series([css, concatCSS])); //Only needed if multiple css files
    gulp.watch(styleWatch, css);
    gulp.watch(jsSrc, javascript);
    gulp.watch(imgSrc, imagemin)
    gulp.watch([htmlWatch, jsDist, styleDist]).on('change', browserSync.reload);
}

//uploads dist folder to pans-house server
function deploy(){
  /*var cmd = spawn('scp -P 18765 -r dist panshous@uk47.siteground.eu:/home/panshous/public_html/amexapp',[], {stdio: 'inherit'});
  cmd.on('close', function (code) {
    console.log('my-task exited with code ' + code);
    //cb(code);
  });*/

  exec('scp -P 18765 -r dist panshous@uk47.siteground.eu:/home/panshous/public_html/amexapp -pw Netzach1', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });





//   return gulp.src('**/*.js')
//     .pipe(scp({
//       host:'uk47.siteground.eu',
//       username:'panshous',
//       password: 'Netzach1',
//       port: 18765,
//       dest: '/home/panshous/public_html/amexapp',
//       publicKey: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC3vhlvfIPgZZT6Uu/+StvKOzUUa7GGq3LarXnj8NxkIoUZUKtPfDSTO1Y3E5mn9lEG7VuS3pFJIuJHtOIcFNCFtEPWVgbF/cdKcOtw2nIG3z/TKMIlW7KO5dDMNMgStXQ8RaxyUToMVGgBJvqk2E0FPl9c+/lpS07Zkq2B/LmmgtA2fTTD4Q+LBJSSp0Xu6Pep2EyJ290U/8VJNnDvBh8kZ0OVvZPRWJnIw+X6DQJgnNCsulAeVDOAuR5DeqouknLqpgCRJuErWaIUmYBuTuSObRcvlHQ5Nl7cAvdBcHS5RNIVOCkhBRciEkEJNb8+OAcPgV/snlQmCCQZrvuRx8hzbeFuFt6cYhxFKfijJnTn76Hu/GWGrvRGH+GfhltAaa6JPI2r+mSK+ylDvbR31noJ8Xhz+r/HNIUoeofx8W8TYUg3gjs98N78qib1FWGkZ6pE/oUbvuYN4OkdddIrVZAD4Qo/99YoLCtpP3kZ0crA+J8i/5MWwENePmOin7GBpmc= paul.leppard@PC00642'

//     }))
//     .on('error',function(err){console.log(err);})
}

gulp.task('watch', watch)
gulp.task('sass', css);
gulp.task('js', javascript);
gulp.task('img', imgmin); /* Not working use imgmove instead */
gulp.task('html', htmlminify);
gulp.task('assets', assets);
gulp.task('imgmove', imgmove);


const build = gulp.series(css, javascript, imgmove, htmlminify, assets);

gulp.task('default', build);

gulp.task('deploy', deploy);

