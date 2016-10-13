interface IGitFileStatus {
	x: string;
	y: string;
	to: string;
	from: string;
}

declare module 'git-status' {
	function gitStatus(callback: (err: Error, data: IGitFileStatus[]) => void): void;
	export = gitStatus;
}
