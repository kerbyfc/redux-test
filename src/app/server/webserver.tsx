/**
 * External imports
 */
import * as _ from 'lodash';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Local imports
 */
import {bootstrap} from './bootstrap';
import {match} from 'react-router';
import {ROUTES} from '../shared/router';
import {VARS} from '../shared/constants/vars';

/**
 * Configuration
 */
const port = 3001;
const app = express();
if (process.env.NODE_ENV !== 'production') {
    require('./../../../webpack.dev.js')(app);
}

app.use(express.static(path.join(__dirname, 'build')));

/**
 * Layout
 */
const layout: string = fs.readFileSync(path.join(__dirname, '../index.html')).toString();

function embedReactApplictionToLayout({view, state}) {
    return _.template(layout)({view, state, applicationId: VARS.APP_COMPONENT_ID});
}

app.use((req, res) => {
    match({routes: ROUTES, location: req.url}, (err, redirectLocation, renderProps) => {

        bootstrap(renderProps)
            .then((initialData) => {
                res.end(embedReactApplictionToLayout(initialData));
            })
            .catch(err => {
                res.end(err.message + err.stack);
            });
    });
});

/**
 * Initialization
 */
app.listen(port, function() {
    console.log('Listening port ' + port);
});
