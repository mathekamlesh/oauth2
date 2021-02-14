const express = require('express');
const bodyParser = require('body-parser');
const oauthRoute = require('./routes/oauth.js');
const uuid = require('uuid').v4;
const helmet = require('helmet');


const app = express();
app.use((req, res, next) => {
    const refererUid = uuid();
    console.log(`Request for :${refererUid}`);
    next();
})
app.use(bodyParser.json());
app.use(oauthRoute);
app.use(helmet());


 app.listen(3000);