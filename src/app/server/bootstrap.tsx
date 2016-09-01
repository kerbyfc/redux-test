import * as _ from 'lodash';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';

import {match} from 'react-router';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {RouterContext} from 'react-router';

import {APP_COMPONENT_ID} from '../shared/constants';
import {ROUTES} from '../shared/router';

const port = 3001;
const app = express();

const layout: string = fs.readFileSync(path.join(__dirname, '../index.html')).toString();

if (process.env.NODE_ENV !== 'production') {
    require('./../../../webpack.dev.js')(app);
}

app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res) => {
    match({routes: ROUTES, location: req.url}, (err, redirectLocation, renderProps) => {
        const InitialView = (
            <Provider>
                <RouterContext {...renderProps} />
            </Provider>
        );

        const html = renderToString(InitialView);
        const state = {};

        res.end(_.template(layout)({html, state, APP_COMPONENT_ID}));
    });

});

app.listen(port, function() {
    console.log('Listening port ' + port);
});

export default app;

