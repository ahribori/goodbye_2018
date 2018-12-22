const EventEmitter = require('events');

class SendMessageEventEmitter extends EventEmitter {}

module.exports = new SendMessageEventEmitter();
