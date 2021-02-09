import express from 'express';
import bodyParser from 'body-parser';
import oauthRoute from './routes/oauth.js';

const app = express();
app.use(bodyParser.json());
app.use(oauthRoute);


 app.listen(3000);