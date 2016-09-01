import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';

const port = 3001;
const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('./../../webpack.dev.js')(app);
}

app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res) => {
    res.send('Hello app!');
});

app.listen(port, function() {
    console.log('Listening port ' + port);
});

export default app;

