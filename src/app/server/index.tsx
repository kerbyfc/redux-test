/**
 * External imports
 */
import * as _ from 'lodash';
import * as express from 'express';
import * as path from 'path';

/**
 * Local imports
 */
import {render} from './renderer';
import {match} from 'react-router';
import {ROUTES} from '../common/routes';
import {VARS} from '../constants/vars';

/**
 * Configuration
 */
const port = 3001;
const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('./../../../webpack.dev.js')(app);
}

app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res) => {
    match({routes: ROUTES, location: req.url}, (err, redirectLocation, renderProps) => {
        render(renderProps)
            .then((html) => {
                res.end(html);
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
