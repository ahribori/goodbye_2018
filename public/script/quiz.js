particlesJS.load('particles-js', '/script/particlesjs-config.json', function() {
  console.log('callback - particles.js config loaded');
});

const socket = io({
  path: '/socket.io',
  transports: ['websocket'],
});

const $ = window.$;
const $container = $('.rank_list');
const prefixType = ['1등!', '2등!', '3등!'];
const iconType = ['gold', 'silver', 'bronze'];
const backgroundColors = ['rgba(180,120,0,0.4)', 'rgba(180,180,180,0.4)', 'rgba(100,20,0,0.4)'];

const answer = function(message, from) {
  const childElementCount = $container[0].childElementCount;
  if (childElementCount > 9) {
    return;
  }
  const prefix = prefixType[childElementCount] || '';
  const iconClass = iconType[childElementCount] || '';
  const $itemWrapper = $('<div class="rank animated bounceInUp" />');
  const $icon = $('<div class="rank_img" />').addClass(iconClass);
  const $answer = $('<div class="answer">' + prefix + ' ' + message + '</div>');
  const $from = $('<div class="from">' + from + '</div>');
  $itemWrapper
    .css({ backgroundColor: backgroundColors[childElementCount] })
    .append($icon)
    .append($answer)
    .append($from);
  $container.append($itemWrapper);
};

socket.on('message::fromServer', function(payload) {
  const message = payload.message;
  const from = payload.from;

  if (message) {
    answer(message, from);
  }
});

socket.on('clear::fromServer', function() {
  $container.find('.rank').addClass('animated flipOutX');
  setTimeout(function() {
    $container.empty();
  }, 1000);
});
