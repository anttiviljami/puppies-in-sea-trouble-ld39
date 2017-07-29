// example.tsx
import * as elements from 'typed-html';

const styles = `
html,
body {
  background: #000;
  margin: 0;
  padding: 0;
  height: 100%;
}
#wrap {
  text-align: center;
}
#content {
  height: 100%;
  display: inline-block;
}
`;

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
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta http-equiv="cleartype" content="on" />
      <style>{styles}</style>
    </head>
    <body>
      <div id="wrap">
        <div id="content" />
      </div>
      <script src="//cdn.jsdelivr.net/npm/phaser-ce@2.8.3" />
      <script src="//cdn.socket.io/socket.io-1.2.0.js" />
      <script src="/static/bundle.js" />
      <script>{script}</script>
    </body>
  </html>
);

export default base;
