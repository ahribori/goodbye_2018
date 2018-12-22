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

const colors = [
  'white',
  '#ffe066',
];

const renderMessage = function(message) {
  const height = document.body.getBoundingClientRect().height;

  const positionY = getRandomNumberFromArea(150, height - 150);
  const fontSize = getRandomNumberFromArea(24, 60);
  const duration = getRandomNumberFromArea(5, 12);

  const $message = $('<div class="message marquee youth"></div>')
    .text(message)
    .css({
      top: positionY,
      color: colors[getRandomIndex(colors.length)],
      'font-size': fontSize + 'px',
      'animation-duration': duration + 's',
      'text-shadow': '1px 1px grey',
    });
  $body.append($message);

  setTimeout(function() {
    $message.remove();
  }, duration * 1000 + 500);
};

socket.on('message::fromServer', function(payload) {
  const message = payload.message;
  if (message) {
    renderMessage(message);
  }
});
