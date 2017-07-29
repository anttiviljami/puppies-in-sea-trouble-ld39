// example.tsx
import * as elements from 'typed-html';

const styles = `
`;

const script = `
  (function (io) {
    var socket = io({transports: ['websocket']});
    window.emit = function(msg) {
      socket.emit('chat message', msg);
    }
    socket.on('chat message', function(msg){
      console.log(msg);
    });
  })(io);
`;

const base = (
  <html>
    <head>
      <title>Trickle</title>
      <style>{styles}</style>
    </head>
    <body>
      <ul id="messages" />
      <script src="https://cdn.socket.io/socket.io-1.2.0.js" />
      <script>{script}</script>
    </body>
  </html>
);

export default base;
