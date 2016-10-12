import {f, generateFile} from '../utils';

const target = f('.editorconfig');

if (!target.exists) {
	generateFile(f('templates/editorconfig.ejs'), null, target);
}
