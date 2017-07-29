// example.tsx
import * as elements from 'typed-html';

const styles = `body { background: #111 }`;

const script = `
  (function () {
    var socket = io({transports: ['websocket']});
    window.charge = function() {
      socket.emit('charge');
    }
    socket.on('game event', function(msg) {
      console.log(msg);
    });
  })();
`;

const base = (
  <html>
    <head>
      <title>Trickle</title>
      <style>{styles}</style>
    </head>
    <body>
      <script src="https://cdn.socket.io/socket.io-1.2.0.js" />
      <script src="//cdn.jsdelivr.net/npm/phaser-ce@2.8.3" />
      <script>{script}</script>
    </body>
  </html>
);

export default base;
