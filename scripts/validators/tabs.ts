import 'colors';
import * as fs from 'fs';
import gitStatus = require('git-status');
import leftPad = require('left-pad');
import rightPad = require('right-pad');
import {getLogger} from 'loglevel';

function showInvisibles(str: string): string {
	return str.replace(/\t/g, '---').replace(/\s/g, '⋅');
}

const logger: Log = getLogger('validators:tabs');

gitStatus(function (err, data) {
	if (err) {
		logger.error(err);
		process.exit(1);
	} else {
		const error = [];

		if (data) {
			data.forEach(function(file) {
				if (file.x !== ' ' && file.x !== '?' && file.x !== 'D' && file.to) {
					let count = 0;

					fs.readFileSync(file.to).toString().replace(/[^\t\n\r](\t+)/g, (m, tabs, index, text) => {
						const line = text.slice(0, index).split(/\n/).length;

						if (!count) {
							error.push('\n  at ' + file.to);
						}

						error.push(`     ${file.to}:${rightPad(line.toString(), 4, ' ')}  ${leftPad(line, 4, ' ')}|${
							showInvisibles(
								text.slice(text.slice(0, index).lastIndexOf('\n'), index + 1) +
								Array(tabs.length + 1).join('---').red +
								text.slice(index + tabs.length + 1, index + text.slice(index).indexOf('\n'))
							)}`
						);

						count++;
						return m;
					});
				}
			});
		}

		if (error.length) {
			logger.info('\nTabs are not allowed for alignment:\n', error.join('\n'), '\n');
			process.exit(1);
		} else {
			process.exit(0);
		}
	}
});
