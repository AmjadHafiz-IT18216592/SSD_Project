const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const { request } = require('http');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to backend!')
});

require("./routes/authRoutes")(app);
require("./routes/driveRoutes")(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})