import express from 'express';
import path from 'path';
import 'dotenv/config';

import constants from './config/constants';
import configMiddleware from './config/middlewares';
import './config/database';
import routesConfig from './module';

const app = express();

app.use(express.static(path.join(__dirname, '/../../client/build')));

configMiddleware(app);

routesConfig(app);

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname + '/../../client/build/index.html'));
});

app.listen(constants.PORT, () => console.log(`
    Service is up on port ${constants.PORT} 🐳
    ---`));
