import express from 'express';
import OAuth2Server from 'oauth2-server';
import oauthModel from './../models/oauth.js';

const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;
const router = express.Router();

const oauth = new OAuth2Server({
  model: oauthModel
});

router.post('/loginToken.php', (req, res, next) => {
    const authString = Buffer.from(`${req.body.client_id}:${req.body.client_secret}`, "utf8").toString("base64");
    const request = new Request({ method: req.method, body: req.body, headers: { ...req.headers, 'authorization': `Basic ${authString}`, 'content-type': "application/x-www-form-urlencoded" }, query: {} });
    const response = new Response(res);
    oauth.token(request, response)
        .then((data) => {
            const formatedDetails = {
                access_token: data.accessToken,
                expires_in: data.client.accessTokenLifetime,
                token_type: data.tokenType,
                scope: data.client.scope,
                refresh_token: data.refreshToken
            };
            res.send(formatedDetails);
        })
        .catch((err) => {
            res.send(err)
        });
});

export default router;