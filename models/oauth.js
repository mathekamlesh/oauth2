const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_USER_PASSWORD,
  database : process.env.DB_NAME
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

const model = {

  getAccessToken: function(accessToken) {
    return new Promise((resolve,reject)=>{
        connection.query('SELECT * FROM oauth_access_tokens WHERE access_token = ?',[accessToken],(error,result,fields)=>{
            if(error) reject(error);
            if(result[0]){
                var token = {
                            accessToken:result[0].access_token,
                            accessTokenExpiresAt:result[0].expires,
                            scope:result[0].scope,
                            client:{id:result[0].client_id},
                            user:{user_id:result[0].user_id},
                        };
            }else{
                var token = {};
            }            
            resolve(token);
        });
    });
  },

  getAuthorizationCode: function(done) {
    done(null, 'works!');
  },

  getClient: function(clientId,clientSecret) {
      return new Promise((resolve,reject)=>{
        connection.query('SELECT * FROM oauth_clients WHERE client_id = ? AND client_secret = ?',[clientId,clientSecret],(error,result,fields)=>{
            if(error) reject(error);
            if(result[0]){
                var client = {
                            id:result[0].client_id,
                            redirectUris:result[0].redirect_uri.split(' '),
                            grants:['password'],
                            accessTokenLifetime:3600,
                            refreshTokenLifetime:60*60*24*15,
                            scope:result[0].scope
                        };
            }else{
                var client = {};
            }            
            resolve(client);
        });
    });
  },
  
  getUser: function(username,password) {
      return new Promise((resolve,reject)=>{
        connection.query('SELECT * FROM cscart_users WHERE email = ? AND password = ?',[username,password],(error,result,fields)=>{
            if(error) reject(error);
            if(result[0]){
                var user = {
                            user_id:result[0].user_id,
                            email:result[0].email,
                            status:result[0].status
                        };
            }else{
                var user = null;
            }        
            resolve(user);
        });
    });
  },
  saveToken: function(token, client, user) {
      return new Promise((resolve,reject)=>{
        connection.query('INSERT INTO oauth_access_tokens(access_token,client_id,user_id,expires,scope) VALUE (?)',
        [[token.accessToken,client.id,user.user_id,token.accessTokenExpiresAt,token.scope]],(error,result,fields)=>{
            if(error) reject(error);
                connection.query('INSERT INTO oauth_refresh_tokens(refresh_token,client_id,user_id,expires,scope) VALUE (?)',
            [[token.refreshToken,client.id,user.user_id,token.refreshTokenExpiresAt,token.scope]],(error,result,fields)=>{
                if(error) reject(error);
                token.tokenType = 'Bearer';             
                resolve({...token,client:client, user:user});
            })
        });
    });
  }  
};

module.exports = model;