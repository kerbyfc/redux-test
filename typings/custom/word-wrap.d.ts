interface IWrapOptions {
	trim: boolean,
	newline: string,
	indent: string,
	width: number
}

declare module 'word-wrap' {
	function wordWrap(str: string, wrapOptions: IWrapOptions): string;
	export = wordWrap;
}
