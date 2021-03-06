var gulp        = require('gulp');
var browserSync = require('browser-sync');
var cp          = require('child_process');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn(jekyll, ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', gulp.series('jekyll-build', function () {
    browserSync.reload();
}));

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', gulp.series('jekyll-build', function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
}));

/**
 * Watch html/md files, run jekyll & reload BrowserSync
 * if you add folder for pages, collection or datas, add them to this list
 */
gulp.task('watch', function () {
    gulp.watch([
        './*', 
        '_includes/*', 
        '_layouts/*', 
        '_posts/*', 
        '_sass/*', 
        'css/*', 
        'js/*'
    ], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', gulp.series('browser-sync', 'watch'));
