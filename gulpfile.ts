// tslint:disable:no-var-requires

import * as gulp from 'gulp';
import * as gutil from 'gulp-util';
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import * as flat from 'flat';
import * as glob from 'glob';
import * as watch from 'gulp-watch';

import {Json2Ts} from './scripts/generators/json2ts';
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
    return makeJsObject(obj, function (value, key) {
        return unquoteValue('new Ref(' + cassandraMap.stringify(value) + ', \'' + key + '\')');
    });
}

function makeInitialState(obj) {
    return makeJsObject(obj, function (value, key, unquote) {
        if (typeof value === 'string') {
            return unquote('\'' + value + '\'');
        }
        return value;
    });
}

function extractInjectables(file: string | {contents: Buffer}) {
    let content: string;
    if (typeof file === 'string') {
        content = fs.readFileSync(file).toString();
    } else {
        content = file.contents.toString();
    }

    const classes = [];
    let i = 0;

    content.replace(/class\s+(\w+)/g, (m: string, className: string, index: number) => {
        if (content.slice(i, index).match('@injectable()')) {
            classes.push(className);
        }
        i = index;
        return m;
    });

    return classes;
}

const providersFolder = './src/config';
let providersCache = {};

function writeProviders(providersObject) {
    providersCache = providersObject;

    const imports = _(providersCache)
        .map((classes: string[], file) => {
            if (classes.length) {
                return `import {${classes.join(', ')}} from '${file.replace(/\.tsx?$/, '')}';`;
            }
        })
        .compact()
        .sort()
        .join('\n');

    const providers = _(providersCache).toArray().flatten().value().sort().join(',\n    ');

    fs.writeFileSync('./src/config/providers.ts', [
        imports,
        `export const injector = new Injector();`,
        `injector.registerProviders([\n    ${providers}\n]);`
    ].join('\n\n') + '\n');
}

function compileStyleDts(filepath) {
    return dtsCreator.create(filepath).then((contents) => {
        const classes = gutil.colors.blue(contents.rawTokenList.map((token) => `.${token}`).join(' '));
        gutil.log(`Finished '${gutil.colors.cyan(path.basename(contents.rInputPath))}' ${classes}`);

        if (contents.messageList.length) {
            gutil.log(contents.messageList.join('\n  '));
        }
        fs.writeFile(contents.rInputPath + '.d.ts', contents.resultList.join('\n'));
    });
}

gulp.task('gen-styles-dts', () => {
    gulp.src('./src/**/*.scss', {read: false})
        .pipe(tap((file) => {
            compileStyleDts(file.path);
        }));
});

gulp.task('gen-state', () => {
    gulp.src('./src/config/state.yml')
        .pipe(yaml())
        .pipe(tap(function (file) {
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

gulp.task('gen-providers', () => {
    glob('../**/*.ts*', {cwd: providersFolder}, (er, files) => {
        writeProviders(
            _.reduce(files, (acc, file) => {
                const filepath = path.join(providersFolder, file);
                acc[file] = extractInjectables(filepath);
                return acc;
            }, {})
        );
    });
});

gulp.task('watch-providers', ['gen-providers'], () => {
    watch('./src/**/*.ts*', (vinylFile) => {
        if (!vinylFile.path.match(/providers\.ts/)) {
            const relpath = path.relative(providersFolder, vinylFile.path);

            if (vinylFile.event === 'unlink') {
                delete providersCache[relpath];
            } else {
                providersCache[relpath] = extractInjectables(vinylFile);
            }

            writeProviders(providersCache);
        }
    });
});

gulp.task('watch-styles-dts', ['gen-styles-dts'], () => {
    gulp.watch('./src/**/*.scss', (event: {type: string, path: string}) => {
        if (_.includes(['deleted', 'renamed'], event.type)) {
            fs.unlink(event.path + '.d.ts');
        } else {
            compileStyleDts(event.path);
        }
    });
});

gulp.task('watch-state', ['gen-state'], () => {
    gulp.watch(['./src/state.yml'], ['generate-interfaces']);
});

gulp.task('watch', [
    'watch-state',
    'watch-styles-dts',
    'watch-providers'
]);

