var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    minifyCss = require('gulp-minify-css'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-minify-html'),
    ui5uploader = require('gulp-nwabap-ui5uploader');


var paths = {
    scripts: 'webapp/js/**/*.*',
    styles: 'webapp/less/**/*.*',
    images: 'webapp/img/**/*.*',
    index: 'webapp/index.html',
};

/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest('dist/'));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('dist/lib'));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-less', 'custom-templates', 'custom-ui5-binaries']);

//Simple task to just copy all files to "dest" folder 
gulp.task('copy-to-dest', function() {
    return gulp.src('webapp/**')
        .pipe(gulp.dest('dist/'));
});


gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest('dist/img'));
});

// This file include a list of binary file types that should be uploaded when running program /UI5/UI5_REPOSITORY_LOAD in SAP 
gulp.task('custom-ui5-binaries', function() {
    return gulp.src('.Ui5RepositoryBinaryFiles')
        .pipe(gulp.dest('dist/'));
});

gulp.task('custom-js', function() {
    return gulp.src(paths.scripts)
        .pipe(minifyJs())
        .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('custom-less', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('custom-templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist/templates'));
});


gulp.task('deploy', function() {
  return gulp.src('webapp/**')
    .pipe(ui5uploader({
        root: 'webapp',
        conn: {
            server: 'http://achilles.conocophillips.net:8022'
        },
        auth: {
            user: 'fstoedl',
            pwd: 'Jone2090'
        },
        ui5: {
            package: 'ZISSOW',
            bspcontainer: 'ZISW_IC_LIST',
            bspcontainer_text: 'IC Worklist',
            transportno: 'DE2K9A0P06'
        },
    }));
});


/**
 * Gulp tasks
 */
gulp.task('build', ['copy-to-dest']);
gulp.task('default', ['build']);

