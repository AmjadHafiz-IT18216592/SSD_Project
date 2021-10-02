const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis');
const multer = require('multer');
const fs = require("fs");
const formidable = require('formidable');
const accessCredentials = require('./credentials/client_secret.json');


const { request } = require('http');

const clientID = accessCredentials.web.client_id;
const clientSecret = accessCredentials.web.client_secret;
const redirectURIs = accessCredentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(clientID, clientSecret, redirectURIs[0]);
const ACCESS_SCOPE = ['https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file']


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to backend!')
});


app.get('/getAuthURL',(req,res)=>{
    const authURL = oAuth2Client.generateAuthUrl({
        access_type:'offline',
        scope:ACCESS_SCOPE,
    });
    console.log(authURL);
    return res.send(authURL);
});

app.post('/getToken',(req,res)=>{
    if(req.body.code == null) return res.status(400).send('Invalid Request');
    oAuth2Client.getToken(req.body.code, (err,token)=>{
      if(err){
        console.error('Error retreiving access token',err);
        return res.status(400).send('Error retreiving access token');
      }
      res.send(token);
    });
  });
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})