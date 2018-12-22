particlesJS.load('particles-js', '/script/particlesjs-config.json', function() {
  console.log('callback - particles.js config loaded');
});

const socket = io({
  path: '/socket.io',
  transports: ['websocket'],
});

const $ = window.$;
const body = document.body;
const $body = $(body);

const getRandomNumberFromArea = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomIndex = function(length) {
  return Math.floor(Math.random() * length);
};

const renderMessage = function(message, to) {
  const height = document.body.getBoundingClientRect().height;

  const positionY = getRandomNumberFromArea(150, height - 150);
  const fontSize = getRandomNumberFromArea(20, 28);
  const duration = getRandomNumberFromArea(5, 12);

  const $messageContainer = $('<div class="messageContainer marquee youth"></div>').css({
    top: positionY,
    color: '#ffffff',
    'font-size': fontSize + 'px',
    'animation-duration': duration + 's',
  });

  const $message = $('<div class="message">' + message + '</div>');

  if (to) {
    const $to = $('<div class="to">To. ' + to + '</div>').css({ 'font-size': '0.6em' });
    $messageContainer.append($to).css({
      'font-size': 50,
      color: '#ffe066'
    });
  }

  $messageContainer.append($message);
  $body.append($messageContainer);

  setTimeout(function() {
    $message.remove();
  }, duration * 1000 + 500);
};

socket.on('message::fromServer', function(payload) {
  const message = payload.message;
  const to = payload.to;

  if (message) {
    renderMessage(message, to);
  }
});
