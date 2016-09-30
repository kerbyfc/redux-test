import request from 'superagent';
import nocker from 'superagent-nock';

global.nock = nocker(request);
