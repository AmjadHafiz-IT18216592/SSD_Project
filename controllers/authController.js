const { google } = require('googleapis');

const accessCredentials = require('../credentials/client_secret.json');

const clientID = accessCredentials.web.client_id;
const clientSecret = accessCredentials.web.client_secret;
const redirectURIs = accessCredentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(clientID, clientSecret, redirectURIs[0]);
const ACCESS_SCOPE = ['https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file']

exports.getAuthUrl = (req, res) => {
    const authURL = oAuth2Client.generateAuthUrl({
        access_type:'offline',
        scope:ACCESS_SCOPE,
    });
    console.log(authURL);
    return res.send(authURL);
};

exports.getToken = (req,res) => {
    if (req.body.code == null) return res.status(400).send('Invalid Request');
    oAuth2Client.getToken(req.body.code, (err, token) => {
      if (err) {
        console.error('Error retreiving access token', err);
        return res.status(400).send('Error retreiving access token');
      }
      res.send(token);
    });
}