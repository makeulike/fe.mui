// Include gulp
//var gulp = require('gulp'); 
/*
 * ###151113
 * Added Using to Parameters
 */
var gulp = require('gulp-param')(require('gulp'), process.argv);

// Include Our Plugins
// ## System
var 
browserSync = require('browser-sync').create(),
clean = require('gulp-clean'),
merge = require('gulp-merge'),
bower = require('gulp-bower'),
mainBowerFiles = require("main-bower-files");

// ## Utils
var 
runSequence = require('run-sequence').use(gulp),
concat = require('gulp-concat'),
watch = require('gulp-watch'),
batch = require('gulp-batch'),
url = require('url'),
proxy = require('proxy-middleware');

// ## Optimized
var 
uglify = require('gulp-uglify'),
usemin = require('gulp-usemin'),
minifyHtml = require('gulp-minify-html'),
minifyCss = require('gulp-minify-css'),
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant');

// ## Preprocessor
var sass = require('gulp-sass');

// ## Test Tools
var jshint = require('gulp-jshint');

// Proxy Settings
var proxyHost = 'http://localhost';
var proxyContext = '/api'
var proxyURL = proxyHost+proxyContext; 

// Common Settings
/*
 * 경로 json
 * 배열의 0번째 요소는 PC, 1번째 요소는 모바일
 */
var src;
var path =  {
  'assets': {
    'common' : '/assets/',
    'js' : '/assets/js/**/*.js',
    'css' : '/assets/css/**/*.css'
  },
  'src' : {
    'common': [ './example', './example/m' ],
    'html' : [ './example/*.html', './example/m/*.html' ],
    'scss' : [ './example/scss/**/*.scss', './src/scss/**/*.scss' ],
    'css' : [ "./example/css",  "./example/m/css" ],
    'js' : [ './example/js/*.js', './src/js/**/*.js', ],
    'images' : [ './example/images/**/**/*', './example/m/images/**/**/*' ],
  },
  'tmp' : {
    'common': [ './.tmp', './.tmp/m' ],
    'html' : [ './.tmp/*.html', './.tmp/m/*.html' ],
    'scss' : [ './.tmp/scss/**/*.scss', './.tmp/m/scss/**/*.scss' ],
    'css' : [ "./.tmp/css",  "./.tmp/m/css" ],
    'js' : [ './.tmp/js/*.js', './.tmp/m/js/**/*.js' ],
    'images' : [ './.tmp/images/**/**/*', './.tmp/m/images/**/**/*' ],
  },
  'build' : {
    'common': [ './build', './build/m' ],
    'css' : [ "./build/css",  "./build/m/css" ],
    'js' : [ './build/js', './build/m/js' ],
    'images' : [ './build/images', './build/m/images' ],
  }
}
var depth = "/**/**/**/**/**/**/*";

var changePathSrc = function(value){
  
  for(var i=0; i < path.src.common.length; i++){
    path.src.common[i] = path.src.common[i].replace('/example', '/'+value);
    path.src.html[i] = path.src.html[i].replace('/example', '/'+value);
    path.src.scss[i] = path.src.scss[i].replace('/example', '/'+value);
    path.src.css[i] = path.src.css[i].replace('/example', '/'+value);
    path.src.js[i] = path.src.js[i].replace('/example', '/'+value);
    path.src.images[i] = path.src.images[i].replace('/example', '/'+value);
  }

}

/**
 * Labs: JSDoc
 * MacOS Compile JSDoc
 */
var jsdoc = require('gulp-jsdoc3');

gulp.task('jsdoc', function(cb){
  var config = require('./jsdoc.conf.json');

  gulp.src(['./js/'], {read: false})
        .pipe(jsdoc(config,cb));
});

// ------------------------------------------------- Task Started! -------------------------------------------------------- //

/*
 * Develop Tasks
 */
 // #1 process Sass files and return the stream.
 gulp.task('compile-sass', function () {
   return gulp.src(path.src.scss[0])
   .pipe(gulp.dest('./.tmp/scss'))
   .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
   .pipe(gulp.dest(path.src.css[0]))
   .pipe(browserSync.stream());
 });

 gulp.task('compile-sass-mobile', function(){
  return gulp.src(path.src.scss[1])
  .pipe(gulp.dest('./.tmp/m/scss'))
  .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
  .pipe(gulp.dest(path.src.css[1]))
  .pipe(browserSync.stream());
});
 
// #2 process JS files and return the stream.
gulp.task('js', function () {   
  return gulp.src(path.src.js)
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// #3 Using Bower
gulp.task('bower', function() {
  return gulp.src(mainBowerFiles(), {base: "bower_components"})
  .pipe(gulp.dest(config.paths.bower.dest));
});

// ## Task Set
gulp.task('develop', function(product) {
  /*
   * ###151113
   * 각 프로젝트 별 개발 경로를 SRC로 변환하는 작업이 필요.
   */
  src = '_projects/'+product;
  if(product === null) src = path.src.common[0]

  changePathSrc(src);

  /*
   * ### 151113
   * Using Proxy
   */
  var proxyOptions = url.parse(proxyURL);
  proxyOptions.route = proxyContext;

  browserSync.init({
    server: {
      baseDir: ["./", src],
      middleware: [proxy(proxyOptions)]
    }
  });

  /*
   * ### 151113
   * Detect New and Delete Files
   * HTML, SCSS, Js
   */
  watch(path.src.scss[0], batch(function (events, done) {
    gulp.start('compile-sass', done);
  }));

  watch(path.src.scss[1], batch(function (events, done) {
    gulp.start('compile-sass-mobile', done);
  }));

  watch(path.src.js, batch(function (events, done) {
    gulp.start('js', done);
  }));

  gulp.watch(path.src.html).on('change', browserSync.reload);
  gulp.watch(path.src.js).on('change', browserSync.reload);
  gulp.watch(path.src.css[0]+'/*.css').on('change', browserSync.reload);
  gulp.watch(path.src.css[1]+'/*.css').on('change', browserSync.reload);
  gulp.watch(path.src.images).on('change', browserSync.reload);
});

// ------------------------------------------------------------------------------------------------------------------------- //
/*
 * Build Process
 */

// #1 Clean Folder
gulp.task('clean', function(){
  var tmp = gulp.src(path.tmp.common[0])
        .pipe(clean({force:true}));

  var common = gulp.src(path.build.common[0])
        .pipe(clean({force:true}));

  return merge(tmp, common);
});

gulp.task('copy', function(){
  var common = gulp.src(path.src.common[0]+depth)
        .pipe(gulp.dest(path.tmp.common[0]));

  return common;
});

gulp.task('copy-assets', function(){
  var assets = gulp.src(path.tmp.common[0]+'/assets'+depth)
        .pipe(gulp.dest(path.build.common[0]+'/assets/'));
  return assets;
})

// #2 Usemin
gulp.task('usemin', function() {
  var opt = {
    inlinejs: [ uglify() ],
    inlinecss: [ minifyCss(), 'concat' ]
  };

  var pc = gulp.src(path.tmp.html[0])
        .pipe(usemin(opt))
        .pipe(gulp.dest(path.build.common[0]));

  var mobile = gulp.src(path.tmp.html[1])
        .pipe(usemin(opt))
        .pipe(gulp.dest(path.build.common[1]));

  return merge(pc, mobile);
});

// #3 Javascript (추후 webpack 로 변경 예정)
gulp.task('build-js', function(){
  var pc = gulp.src(path.tmp.js[0])
        .pipe(gulp.dest(path.build.js[0]));

  var mobile = gulp.src(path.tmp.js[1])
        .pipe(gulp.dest(path.build.js[1]));

  return merge(pc, mobile);
});

// #4 Sass Build 
gulp.task('build-sass', function(){
  var opt = {
    outputStyle: 'compressed'
  };

  var pc = gulp.src(path.tmp.scss[0])
       .pipe(sass(opt))
       .pipe(gulp.dest(path.build.css[0]));

  var mobile = gulp.src(path.tmp.scss[1])
       .pipe(sass(opt))
       .pipe(gulp.dest(path.build.css[1]));

  return merge(pc, mobile);
});

// #5 Images Optimization
gulp.task('build-images', function () {
  var opt = {
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }

  var pc = gulp.src(path.tmp.images[0])
        .pipe(imagemin(opt))
        .pipe(gulp.dest(path.build.images[0]));

  var mobile = gulp.src(path.tmp.images[1])
        .pipe(imagemin(opt))
        .pipe(gulp.dest(path.build.images[1]));

  return merge(pc, mobile);
});

// #6 Assets Uglify
gulp.task('uglify-js', function(){
  var pc = gulp.src(path.build.common[0]+path.assets.js)
        .pipe(uglify())
        .pipe(gulp.dest(path.build.common[0]+path.assets.common+'/js'));
  var mobile = gulp.src(path.build.common[1]+path.assets.js)
        .pipe(uglify())
        .pipe(gulp.dest(path.build.common[1]+path.assets.common+'/js'));

  return merge(pc, mobile);
});

/* Integrate All of tasks*/
gulp.task('build', function(product, callback){
  /* Set Folder path */
  src = '_projects/'+product;
  if(product === null) src = path.src.common[0]
  
  changePathSrc(src);
  /*
   * ### 151113
   * 모든 테스크들이 동기적으로 실행 안되는 경우 존재, 문제 확인 해야함 
   */
  runSequence('clean', ['copy', 'copy-assets'], ['usemin', 'build-js', 'build-sass', 'build-images'], 'uglify-js');
});