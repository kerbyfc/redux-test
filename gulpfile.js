var gulp = require('gulp');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var yaml = require('gulp-yaml');
var rename = require('gulp-rename');
var flat = require('flat');
var _ = require('lodash');
var fs = require('fs');
var cassandraMap = require('cassandra-map');

require('typescript-require');

var Json2Ts = require('./scripts/json2ts').Json2Ts;
var DtsCreator = require('typed-css-modules');

var dtsCreator = new DtsCreator();
var json2ts = new Json2Ts();

var nl = "\n\n";

function unquoteKey(str) {
    return "<%" + str.split('.').join("%>.<%") + "%>";
}

function unquoteValue(str) {
    return "<!" + str + "!>";
}

function makeJsObject(obj, valueWrapper) {
    if (!valueWrapper) {
        valueWrapper = function (value) {
            return value;
        }
    }

    if (typeof obj === "object") {
        obj = flat.unflatten(_.reduce(flat.flatten(obj), function(acc, value, key) {
            acc[unquoteKey(key)] = valueWrapper(value, key, unquoteValue);
            return acc;
        }, {}));
    }

    return JSON.stringify(obj, null, 4)
        .replace(/"<%(.*)%>"/g, "$1")
        .replace(/"<!(.*)!>"/g, "$1")
}

function makeRefs(obj) {
    return makeJsObject(obj, function(value, key, unquote) {
        return unquoteValue("new Ref(" + cassandraMap.stringify(value) + ", '" + key + "')");
    });
}

function makeInitialState(obj) {
    return makeJsObject(obj, function(value, key, unquote) {
        if (typeof value === 'string') {
            return unquote("'" + value + "'");
        }
        return value;
    });
}

gulp.task('gen-state', function() {
    gulp.src('./src/state.yml')
        .pipe(yaml())
        .pipe(tap(function(file) {
            var content = file.contents.toString();

            var interfaces = [
                json2ts.convert(content, "App", "I$State"),
                json2ts.convert(content, "App", "I$StateRef", "IRef<$>")
            ].join(nl);

            var state = [
                "import {Ref} from './core/Ref';",
                "export const initialState: IAppState = " + makeInitialState(JSON.parse(content)) + ";",
                "export const stateRefs: IAppStateRef = " + makeRefs(JSON.parse(content)) + ";",
                ""
            ].join(nl);

            fs.writeFileSync('./src/interfaces/IState.d.ts', interfaces);
            fs.writeFileSync('./src/state.ts', state);
        }));
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

