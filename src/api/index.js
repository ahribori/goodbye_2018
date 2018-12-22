const express = require('express');
const router = express.Router();
const config = require('../conf');
const SendMessageEventEmitter = require('../events/SendMessageEventEmitter');

const { secret } = config;

router.post('/message', (req, res) => {
  const xSecret = req.get('x-secret');
  if (secret !== xSecret) {
    res.status(403).json({
      success: false,
      message: 'Secret key not matched. Check x-secret header.'
    })
  }

  const { message } = req.body;

  SendMessageEventEmitter.emit('event::send', { message });

  res.json({
    success: true,
    message,
  });
});

module.exports = router;
