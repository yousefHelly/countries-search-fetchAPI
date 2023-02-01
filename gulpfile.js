import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'
import uglify from 'gulp-uglify'
import sm from 'gulp-sourcemaps'
//minify html task
gulp.task('html',()=>{
    return gulp.src('project/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('.'))
}
)
//minify js and add source map task
gulp.task('js',()=>{
    return gulp.src('project/js/main.js')
    .pipe(sm.init())
    .pipe(uglify())
    .pipe(sm.write(""))
    .pipe(gulp.dest('dist/js'))
})

// watch html and js files
gulp.task('watch',()=>{
    gulp.watch('project/index.html',gulp.series('html'))
    gulp.watch('project/js/main.js',gulp.series('js'))
})

gulp.task('default',gulp.parallel(['html'],['js'],['watch']))