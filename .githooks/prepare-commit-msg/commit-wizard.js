#!/usr/bin/env node

require('ts-node/register', {
	project: '../../'
});

require('../../scripts/wizards/commit');
