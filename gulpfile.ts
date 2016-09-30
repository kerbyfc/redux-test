// tslint:disable:no-var-requires

import * as gulp from 'gulp';
import * as gutil from 'gulp-util';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as flat from 'flat';

import {Json2Ts} from './scripts/json2ts';
import {NumericDictionary} from 'lodash';

const yaml = require('gulp-yaml');
const tap = require('gulp-tap');
const cassandraMap = require('cassandra-map');
const DtsCreator = require('typed-css-modules');

const dtsCreator = new DtsCreator();
const json2ts = new Json2Ts();

function unquoteKey(str) {
    return '<%' + str.split('.').join('%>.<%') + '%>';
}

function unquoteValue(str) {
    return '<!' + str + '!>';
}

function makeJsObject(obj, valueWrapper) {
    if (!valueWrapper) {
        valueWrapper = function (value) {
            return value;
        };
    }

    if (typeof obj === 'object') {
        obj = flat.unflatten(_.reduce(<NumericDictionary<string>> flat.flatten(obj), (acc, value, key) => {
            acc[unquoteKey(key)] = valueWrapper(value, key, unquoteValue);
            return acc;
        }, {}));
    }

    return JSON.stringify(obj, null, 4)
        .replace(/"<%(.*)%>"/g, '$1')
        .replace(/"<!(.*)!>"/g, '$1');
}

function makeRefs(obj) {
    return makeJsObject(obj, function(value, key) {
        return unquoteValue('new Ref(' + cassandraMap.stringify(value) + ', \'' + key + '\')');
    });
}

function makeInitialState(obj) {
    return makeJsObject(obj, function(value, key, unquote) {
        if (typeof value === 'string') {
            return unquote('\'' + value + '\'');
        }
        return value;
    });
}

gulp.task('gen-state', function() {
    gulp.src('./src/config/state.yml')
        .pipe(yaml())
        .pipe(tap(function(file) {
            const content = file.contents.toString();

            fs.writeFileSync(
                './src/interfaces/IAppState.d.ts',
                json2ts.convert(content, 'App', 'I$State')
            );

            fs.writeFileSync(
                './src/interfaces/IAppStateRef.d.ts',
                json2ts.convert(content, 'App', 'I$StateRef', 'IRef<$>')
            );

            fs.writeFileSync(
                `./src/config/initialState.ts`,
                `export const initialState: IAppState = ${makeInitialState(JSON.parse(content))};\n`
            );

            fs.writeFileSync(
                './src/config/refs.ts',
                [
                    `import {Ref} from '../core/Ref';`,
                    `export const refs: IAppStateRef = ${makeRefs(JSON.parse(content))};\n`
                ].join('\n\n')
            );
        }));
});

function compileStyleDts(filepath) {
    return dtsCreator.create(filepath).then((contents) => {
        gutil.log( `compile ${contents.rInputPath} [${contents.rawTokenList}]`);

        if (contents.messageList.length) {
            gutil.log(contents.messageList.join('\n  '));
        }
        fs.writeFile(contents.rInputPath + '.d.ts', contents.resultList.join('\n'));
    })
}

gulp.task('gen-styles-dts', () => {
    gulp.src('./src/**/*.scss', {read: false})
        .pipe(tap((file) => {
            compileStyleDts(file.path);
        }));
});

gulp.task('watch-styles-dts', () => {
    gulp.watch('./src/**/*.scss', (event: {type: string, path: string}) => {
        if (_.includes(['deleted', 'renamed'], event.type)) {
            fs.unlink(event.path + '.d.ts');
        } else {
            compileStyleDts(event.path);
        }
    });
});

gulp.task('watch-state', () => {
    gulp.watch(['./src/state.yml'], ['generate-interfaces']);
});

gulp.task('dev', [
    'gen-state',
    'gen-styles-dts',
    'watch-state',
    'watch-styles-dts'
]);

