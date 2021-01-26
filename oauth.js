const bodyParser = require('body-parser');
const express = require('express');
const OAuth2Server = require('oauth2-server');
const Request = require('oauth2-server').Request;
const Response = require('oauth2-server').Response;
const app = express();
app.use(bodyParser.json());
const oauth = new OAuth2Server({
  model: require('./model')
});

app.post('/loginToken.php',(req,res,next)=>{
    const authString = Buffer.from(`${req.body.client_id}:${req.body.client_secret}`, "utf8").toString("base64"); 
    const request = new Request({method:req.method,body:req.body,headers:{...req.headers,'authorization':`Basic ${authString}`,'content-type':"application/x-www-form-urlencoded"},query:{}});
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
})


 app.listen(3000);