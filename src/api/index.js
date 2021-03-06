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
      message: 'Secret key not matched. Check x-secret header.',
    });
  }

  const { message, to, from } = req.body;
  if (message || message.trim() === '') {
    if (message.length > 30) {
      return res.status(400).json({
        success: false,
        message: 'Message too long. (Max length: 30)',
      });
    }

    const messageTo = to && to.trim() !== '' && to.length < 20 ? to : null;
    const messageFrom = from && from.trim() !== '' && from.length < 20 ? from : null;

    SendMessageEventEmitter.emit('event::send', { message, to: messageTo, from: messageFrom });

    res.json({
      success: true,
      message,
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Bad request: message',
    });
  }
});

router.post('/message/clear', (req, res) => {
  SendMessageEventEmitter.emit('event::clear');
  res.json({
    success: true,
  });
});

module.exports = router;
