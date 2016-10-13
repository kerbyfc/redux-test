import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as mkdirp from 'mkdirp';
import * as ts from 'typescript';
import chmod = require('chmod');
import TranspileOptions = ts.TranspileOptions;
import ScriptTarget = ts.ScriptTarget;

interface IFile {
	path: string;
	content: string;
	exists: boolean;
	basename: string;
	dir: string;
	ext: string;
	es5: string;
	json: any;
	files: string[];
	filenames: string[];
	shebang: () => IFile;
	write: (content: string, mode?: number) => IFile;
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

	public write(content: string, mode?: number): IFile {
		mkdirp.sync(this.dir);
		fs.writeFileSync(this.path, content);
		if (mode) {
			return this.chmod(mode);
		}
		return this;
	}

	public shebang(): IFile {
		this.write('#!/usr/bin/env node\n' + this.content);
		return this;
	}

	get path(): string {
		return path.join.apply(path, [ROOT].concat(this.relpath.split('/')));
	}

	get dir(): string {
		return path.dirname(this.path);
	}

	get json(): any {
		if (this.ext.match(/ya?ml/)) {
			return yaml.load(this.content);
		}
		return JSON.parse(this.content);
	}

	get es5(): string {
		return this.toJs(ScriptTarget.ES5);
	}

	get ext(): string {
		return path.extname(this.path);
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

	protected toJs(target: ScriptTarget = ScriptTarget.ES5): string {
		if (this.ext.match(/tsx?/)) {
			const options: TranspileOptions = f('tsconfig.json').json;
			options.compilerOptions.target = target;

			return ts.transpileModule(this.content, options).outputText;
		}
	}
}

export function f(projectPath: string): IFile {
	return new File(projectPath);
}

export function renderTemplate(tplFile: IFile, data: any): string {
	return ejs.render(tplFile.content, data);
}


