import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import * as yaml from 'js-yaml';
import * as mkdirp from 'mkdirp';
import chmod = require('chmod');

interface IFile {
	path: string;
	content: string;
	exists: boolean;
	basename: string;
	dir: string;
	files: string[];
	filenames: string[];
	chmod: (mode: number) => IFile;
	generate: (outFile: IFile, scope?: any) => IFile;
	relative: (to: IFile) => string;
}

const ROOT = path.join(__dirname, '..');

class File implements IFile {

	private relpath: string;

	constructor(relpath: string) {
		this.relpath = path.isAbsolute(relpath) ? relpath.replace(ROOT, '') : relpath;
	}

	public generate(outFile: IFile, data: any = {}): IFile {
		mkdirp.sync(outFile.dir);
		fs.writeFileSync(outFile.path, renderTemplate(this, data));
		return outFile;
	}

	public chmod(mode: number): IFile {
		chmod(this.path, mode);
		return this;
	}

	get path(): string {
		return path.join.apply(path, [ROOT].concat(this.relpath.split('/')));
	}

	get dir(): string {
		return path.dirname(this.path);
	}

	get content(): string {
		return fs.readFileSync(this.path).toString();
	}

	get files(): string[] {
		return this.filenames.map((filename) => {
			return path.join(this.path, filename);
		});
	}

	get filenames(): string[] {
		return fs.readdirSync(this.path);
	}

	public relative(to: IFile): string {
		return path.relative(this.path, to.path);
	};

	get basename(): string {
		return path.basename(this.path, path.extname(this.path));
	}

	get exists(): boolean {
		return fs.existsSync(this.path);
	}
}

export function f(projectPath: string): IFile {
	return new File(projectPath);
}

export function renderTemplate(tplFile: IFile, data: any): string {
	return ejs.render(tplFile.content, data);
}

export function showInvisibles(str: string): string {
	return str.replace(/\t/g, '---').replace(/\s/g, '⋅');
}

export function longest(strings: string[]): number {
	return _(strings).orderBy((key) => key.length).last().length + 1;
}

export function readYaml<T extends {}>(file: IFile): T {
	return yaml.safeLoad(file.content);
}
