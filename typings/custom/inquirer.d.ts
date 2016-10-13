import {Questions} from 'inquirer';
import {PromptModule} from 'inquirer';
import {Answers} from 'inquirer';
import {Question} from 'inquirer';
import {UI} from 'inquirer';

declare module 'inquirer' {
	export function createPromptModule(options: {input: any, output: any}): IPromptModule;
}

interface IQuestion extends Question {
	type: 'input' | 'confirm' | 'list' | 'rawlist' | 'password';
}

declare class Prompt extends UI.Prompt {
	public then(handler: (answers: Answers) => any): any;
}

interface IPromptModule extends PromptModule {
	(questions: IQuestion[]): Prompt;
}
