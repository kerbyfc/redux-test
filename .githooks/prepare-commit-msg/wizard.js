#!/usr/bin/env node

var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var wrap = require('word-wrap');
var inquirer = require('inquirer');
var rightPad = require('right-pad');
var longest = require('longest');
var types = require('conventional-commit-types').types;
var ttys = require('ttys');

var prompt = inquirer.createPromptModule({
	input: ttys.stdin,
	output: ttys.stdout
});

prompt([
	{
		type: 'list',
		name: 'type',
		message: 'Select the type of change that you\'re committing:',
		choices: getTypeChoises()
	},
	{
		type: 'input',
		name: 'scope',
		message: 'Denote the scope of this change (routing, compilation, rendering, etc...):\n'
	}, {
		type: 'input',
		name: 'subject',
		message: 'Write a short, imperative tense description of the change:\n'
	}, {
		type: 'input',
		name: 'body',
		message: 'Provide a longer description of the change:\n'
	}, {
		type: 'input',
		name: 'footer',
		message: 'List any breaking changes or issues closed by this change:\n'
	}
]).then(processAnswers);

function processAnswers(answers) {
	var maxLineWidth = 100;

	console.log(answers);

	var wrapOptions = {
		trim: true,
		newline: '\n',
		indent: '',
		width: maxLineWidth
	};

	// parentheses are only needed when a scope is present
	var scope = answers.scope.trim();
	scope = scope ? '(' + answers.scope.trim() + ')' : '';

	// Hard limit this line
	var head = (answers.type + scope + ': ' + answers.subject.trim()).slice(0, maxLineWidth);

	// Wrap these lines at 100 characters
	var body = wrap(answers.body, wrapOptions);
	var footer = wrap(answers.footer, wrapOptions);

	commit(head + '\n\n' + body + '\n\n' + footer);
}

function getTypeChoises() {
	var length = longest(Object.keys(types)).length + 1;
	return _.map(types, function (type, key) {
		return {
			name: rightPad(key + ':', length) + ' ' + type.description,
			value: key
		};
	});
}

function commit(msg) {
	var file = path.resolve(path.join('.git', 'COMMIT_EDITMSG'));
	fs.writeFileSync(file, msg);
	process.stdout.write(msg);
	process.exit(0);
}

