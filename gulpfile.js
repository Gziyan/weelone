var gulp = require('gulp');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');

gulp.task('webserver',function(){
     gulp.src('./')
     .pipe(webserver({
         host:'localhost',
         port:8000,
         middleware:function(req,res){
             if(req.url === 'favicon.ico') return;
             res.writeHead(200,{
                 'Content-type':'text-json;charset=utf-8',
                 'Access-Control-Allow-Origin':"*"
             })
            var data = require('fs').readFileSync('js/data.json');
            res.end(data)
         }
     }))
})
    gulp.task('uglify',function(){
        gulp.src('js/script.js')
        .pipe(concat('jss'))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
    })
      gulp.task('minify',function(){
        gulp.src('css/style.css')
        .pipe(concat('style.css1'))
        .pipe(minify())
        .pipe(gulp.dest('css1'))
    })
    gulp.task('default',['webserver','uglify','minify'])