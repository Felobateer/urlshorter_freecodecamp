require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const url_db = {};
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

function isValidHttpUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch(_) {
    return false;
  }
}

app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;

  if(!isValidHttpUrl(url)) {
    return res.status(400).json({ error: 'invalid url' });
  }

  const shortUrl = Math.floor(Math.random() * 10).toString();

  url_db[shortUrl] = url;

  res.json({ original_url: url, short_url: shortUrl });
});

app.get('/api/shorturl/:short_url', function(req, res) {
  const short = req.params.short_url;
  const url = url_db[short];

  if(url) {
    res.redirect(url);
  } else {
    res.status(404).json({ error: 'invalid url' });
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
