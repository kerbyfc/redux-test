import * as _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import rightPad = require('right-pad');
import wrap = require('word-wrap');
import {Answers, createPromptModule} from 'inquirer';
import {stdin as input, stdout as output} from 'ttys';
import commitTypes = require('conventional-commit-types');

const MAX_LINE_LENGTH = 100;

const prompt = createPromptModule({input, output});

enum QuestionName {
	type,
	scope,
	subject,
	body,
	footer
}

function longest(strings: string[]): number {
	return _(strings).orderBy((key) => key.length).last().length + 1;
}

prompt([
	{
		message: 'Select the type of change that you\'re committing:',
		type: 'list',
		name: QuestionName.type.toString(),
		choices: getTypeChoises(commitTypes.types)
	},
	{
		message: 'Denote the scope of this change (routing, compilation, rendering, etc...):\n',
		type: 'input',
		name: QuestionName.scope.toString()
	},
	{
		message: 'Write a short, imperative tense description of the change:\n',
		type: 'input',
		name: QuestionName.subject.toString()
	},
	{
		message: 'Provide a longer description of the change:\n',
		type: 'input',
		name: QuestionName.body.toString()
	},
	{
		message: 'List any breaking changes or issues closed by this change:\n',
		type: 'input',
		name: QuestionName.footer.toString()
	}
]).then(processAnswers);

function processAnswers(answers: Answers) {
	const wrapOptions = {
		trim: true,
		newline: '\n',
		indent: '',
		width: MAX_LINE_LENGTH
	};

	// parentheses are only needed when a scope is present
	const scope = `${answers[QuestionName.scope]}`.trim();

	// Hard limit this line
	const head = `${answers[QuestionName.type]}${scope ? `(${scope})` : ''}: ${answers[QuestionName.subject]}`
		.trim()
		.slice(0, MAX_LINE_LENGTH);

	// Wrap these lines at 100 characters
	const body = wrap(answers[QuestionName.body].toString(), wrapOptions);
	const footer = wrap(answers[QuestionName.footer].toString(), wrapOptions);

	commit(head + '\n\n' + body + '\n\n' + footer);
}

function getTypeChoises(types) {
	const length = longest(Object.keys(types)) + 1;

	return _.map(types, function (type: {description: string}, key) {
		return {
			name: rightPad(key + ':', length, ' ') + ' ' + type.description,
			value: key
		};
	});
}

function commit(msg) {
	const file = path.resolve(path.join('.git', 'COMMIT_EDITMSG'));
	fs.writeFileSync(file, msg);
	process.stdout.write(msg);
	process.exit(0);
}

