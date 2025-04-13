require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;
  const shortUrl = Math.floor(Math.random() * 10);
  res.json({ original_url: url, short_url: shortUrl });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
