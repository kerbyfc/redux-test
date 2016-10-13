#!/usr/bin/env node

var gitStatus = require("git-status");
var fs = require("fs");
var rightPad = require('right-pad');
var leftPad = require('left-pad');
require('colors');

function showInvisibles(str) {
	return str.replace(/\t/g, '---').replace(/\s/g, '⋅');
}

gitStatus(function (err, data) {
	if (err) {
		console.log(err);
		process.exit(1);
	} else {
		var error = [];

		if (data) {
			data.forEach(function(file) {
				if (file.x != " " && file.x !== "?" && file.x !== "D" && file.to) {
					var count = 0;
					fs.readFileSync(file.to).toString().replace(/[^\t\n\r](\t+)/g, function(m, tabs, index, text) {
						if (!count) {
							error.push("\n  at " + file.to);
						}
						var line = text.slice(0, index).split(/\n/).length;
						error.push(
							"     " + file.to + ":" + rightPad(line.toString(), 4, ' ') + "  " + leftPad(line, 4, ' ') + "|" +
							showInvisibles(
								text.slice(text.slice(0, index).lastIndexOf("\n"), index + 1) +
								Array(tabs.length + 1).join("---").red +
								text.slice(index + tabs.length + 1, index + text.slice(index).indexOf("\n"))
							)
						);
						count++;
					});
				}
			});
		}

		if (error.length) {
			console.log("\nTabs are not allowed for alignment:");
			console.log(error.join("\n") + "\n");
			process.exit(1);
		} else {
			process.exit(0);
		}
	}
});
