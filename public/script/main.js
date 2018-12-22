particlesJS.load('particles-js', '/script/particlesjs-config.json', function() {
  console.log('callback - particles.js config loaded');
});

const socket = io({
  path: '/socket.io',
  transports: ['websocket'],
});

socket.on('message::fromServer', function(data) {
  console.log(data)
});
