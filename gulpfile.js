var gulp = require('gulp');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var yaml = require('gulp-yaml');
var rename = require('gulp-rename');
var flat = require('flat');
var _ = require('lodash');
var fs = require('fs');

require('typescript-require');

var Json2Ts = require('./tools/json2ts').Json2Ts;
var DtsCreator = require('typed-css-modules');

var dtsCreator = new DtsCreator();
var json2ts = new Json2Ts();

function makeRefs(initialState) {
    var state = JSON.parse(initialState);
    flatten = flat.flatten(state);

    /**
     * Create new state reference
     */
    state = flat.unflatten(_.mapValues(flatten, function(value, key) {
        return "<% injector.get(Ref).link('" + key + "') %>";
    }));

    /**
     * Remove quotes
     */
    return JSON.stringify(state, null, 4).replace(/"<% (.*) %>"/g, "$1");
}

gulp.task('gen-state', function () {
    gulp.src('./src/state.yml')
        .pipe(yaml())
        .pipe(tap(function(file) {
            var content = file.contents.toString();
            file.contents = new Buffer([
                "import {memoize} from 'lodash'",
                "import {Ref, IRef} from './core/Ref';",
                "import injector from './core/Injector';",
                json2ts.convert(content, "State", "I$"),
                json2ts.convert(content, "State", "I$Ref", "IRef<$>"),
                "export const initialState: IState = " + JSON.stringify(JSON.parse(content), null, 4) + ";",
                "export const getStateRefs: () => IStateRef = memoize(() => { return " + makeRefs(content) + "});"
                ].join('\n\n')
            );
        }))
        .pipe(rename('state.ts'))
        .pipe(gulp.dest('./src'));
});

function compileStyleDts(filepath) {
    return dtsCreator.create(filepath).then(function(contents) {
        gutil.log(
            "compile", contents.rInputPath,
            "[", "" + contents.rawTokenList, "]");
        if (contents.messageList.length) {
            gutil.log(contents.messageList.join('\n  '));
        }
        fs.writeFile(contents.rInputPath + '.d.ts', contents.resultList.join('\n'));
    })
}

gulp.task('gen-styles-dts', function() {
    gulp.src('./src/**/*.scss', {read: false})
        .pipe(tap(function(file) {
            compileStyleDts(file.path);
        }));
});

gulp.task('watch-styles-dts', function() {
    gulp.watch('./src/**/*.scss', function(event) {
        if (_.includes(['deleted', 'renamed'], event.type)) {
            fs.unlink(event.path + '.d.ts');
        } else {
            compileStyleDts(event.path);
        }
    });
});

gulp.task('watch-state', function () {
    gulp.watch(['./src/state.yml'], ['generate-interfaces']);
});

gulp.task('dev', [
    'gen-state',
    'gen-styles-dts',
    'watch-state',
    'watch-styles-dts'
]);

