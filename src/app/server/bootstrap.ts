import * as _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';

import {APP_COMPONENT_ID} from '../shared/constants';

const port = 3001;
const app = express();
const layout: string = fs.readFileSync(path.join(__dirname, '../index.html')).toString();

if (process.env.NODE_ENV !== 'production') {
    require('./../../../webpack.dev.js')(app);
}

app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res) => {
    const html = 'Initial';
    const state = {};

    res.end(_.template(layout)({html, state, APP_COMPONENT_ID}));
});

app.listen(port, function() {
    console.log('Listening port ' + port);
});

export default app;

