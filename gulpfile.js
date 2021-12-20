let gulp = require("gulp"),
    settings = require("./settings"),
    webpack = require("webpack"),
    browserSync = require("browser-sync").create(),
    postcss = require("gulp-postcss"),
    rgba = require("postcss-hexrgba"),
    autoprefixer = require("autoprefixer"),
    cssvars = require("postcss-simple-vars"),
    nested = require("postcss-nested"),
    cssImport = require("postcss-import"),
    mixins = require("postcss-mixins"),
    colorFunctions = require("postcss-color-function"),
    sass = require("gulp-sass")(require("sass")),
    rename = require("gulp-rename");

gulp.task("styles", function() {
    return gulp
        .src(settings.themeLocation + "css/style.css")
        .pipe(
            postcss([
                cssImport,
                mixins,
                cssvars,
                nested,
                rgba,
                colorFunctions,
                autoprefixer,
            ])
        )
        .on("error", (error) => console.log(error.toString()))
        .pipe(gulp.dest(settings.themeLocation));
});

gulp.task("admin-sass", function() {
    return gulp
        .src(settings.themeLocation + "scss/admin/admin.scss")
        .pipe(
            sass({
                indentType: "tab",
                outputStyle: "expanded",
            })
        )
        .pipe(postcss([autoprefixer]))
        .on("error", (error) => console.log(error.toString()))
        .pipe(rename("admin-compiled-sass.css"))
        .pipe(gulp.dest(settings.themeLocation + "css/admin"))
        .pipe(browserSync.stream());
});

gulp.task("sass", function() {
    return gulp
        .src(settings.themeLocation + "scss/style.scss")
        .pipe(
            sass({
                indentType: "tab",
                outputStyle: "expanded",
            })
        )
        .pipe(postcss([autoprefixer]))
        .on("error", (error) => console.log(error.toString()))
        .pipe(rename("compiled-sass.css"))
        .pipe(gulp.dest(settings.themeLocation + "css"))
        .pipe(browserSync.stream());
});

gulp.task("scripts", function(callback) {
    webpack(require("./webpack.config.js"), function(err, stats) {
        if(err) {
            console.log(err.toString());
        }

        console.log(stats.toString());
        callback();
    });
});

gulp.task("admin-scripts", function(callback) {
    webpack(require("./webpack.config.admin.js"), function(err, stats) {
        if(err) {
            console.log(err.toString());
        }

        console.log(stats.toString());
        callback();
    });
});

gulp.task("watch", function() {
    browserSync.init({
        notify: false,
        proxy: settings.urlToPreview,
        ghostMode: false,
        injectChanges: true,
    });

    gulp.watch("./**/*.php").on("change", browserSync.reload);
    gulp
        .watch([
            settings.themeLocation + "css/**/*.css",
            "!" + settings.themeLocation + "css/admin/**/*.css",
        ])
        .on("change", gulp.parallel("waitForStyles"));
    gulp
        .watch(settings.themeLocation + "scss/admin/**/*.scss")
        .on("change", gulp.parallel("admin-sass"));
    gulp
        .watch([
            settings.themeLocation + "scss/**/*.scss",
            "!" + settings.themeLocation + "scss/admin/**/*.scss",
        ])
        .on("change", gulp.parallel("sass"));
    gulp
        .watch([
            settings.themeLocation + "js/modules/*.js",
            settings.themeLocation + "js/scripts.js",
        ])
        .on("change", gulp.parallel("waitForScripts"));
    gulp
        .watch([
            settings.themeLocation + "js/admin/modules/*.js",
            settings.themeLocation + "js/admin/scripts.js",
        ])
        .on("change", gulp.parallel("waitForAdminScripts"));
});

gulp.task(
    "waitForStyles",
    gulp.series("styles", function() {
        return gulp
            .src(settings.themeLocation + "style.css")
            .pipe(browserSync.stream());
    })
);

gulp.task(
    "waitForScripts",
    gulp.series("scripts", function(cb) {
        browserSync.reload();
        cb();
    })
);

gulp.task(
    "waitForAdminScripts",
    gulp.series("admin-scripts", function(cb) {
        browserSync.reload();
        cb();
    })
);