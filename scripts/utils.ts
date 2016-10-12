import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';

interface IFile {
	path: string;
	content: string;
	exists: boolean;
}

export function f(filepath: string): IFile {
	const file: IFile = {
		path: path.join.apply(null, [__dirname, '..'].concat(filepath.split('/'))),
		exists: null,
		content: null
	};

	return new Proxy(file, {
		get(self: IFile, prop: PropertyKey) {
			switch (prop) {
				case 'content': {
					return fs.readFileSync(self.path).toString();
				}
				case 'exists': {
					return fs.existsSync(self.path);
				}
				default: {
					return self[prop];
				}
			}
		}
	});
}

export function renderTemplate(tplFile: IFile, scope: any): string {
	return ejs.render(tplFile.content, {
		scope: scope
	});
}

export function generateFile(tplFile: IFile, scope: any, toFile: IFile): void {
	fs.writeFileSync(toFile.path, renderTemplate(tplFile, scope));
}
