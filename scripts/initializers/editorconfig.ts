import {f, generateFile} from '../utils';

const target = f('.editorconfig');

if (!target.exists) {
	generateFile(f('config/templates/editorconfig.ejs'), null, target);
}
