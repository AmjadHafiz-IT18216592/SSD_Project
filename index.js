const express = require('express')
const app = express()

const port = 5000

const bodyParser = require('body-parser');

const cors = require('cors');

const { google } = require('googleapis');

const multer = require('multer');

const fs = require("fs");

const formidable = require('formidable');

const { request } = require('http');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to backend!')
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})