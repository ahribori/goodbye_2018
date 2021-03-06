/* =========================================
 Load dependencies
 ============================================*/
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const createServer = require('./socket.io');
const config = require('./conf');
const api = require('./api');
/* =========================================
 Express Configuration
 ============================================*/
const app = express();

const port = process.argv[2] || process.env.PORT || config.port;

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/message_board', (req, res) => {
  res.sendFile(path.resolve('public/message_board.html'));
});
app.get('/quiz', (req, res) => {
  res.sendFile(path.resolve('public/quiz.html'));
});

// set public path
app.use('/', express.static(path.resolve('public')));

app.use('/api', api);

/* handle error */
app.use(function(err, req, res, next) {
  if (err) console.log(err);
  res.status(err.status || 500).send('Something broke!');
});

createServer(app, port);
