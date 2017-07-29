// example.tsx
import * as elements from 'typed-html';

const styles = `
  body { background: #111; margin: 0; }
  #wrap {
    width: 100%;
    height: 100%;
  }
  #thebutton {
    border: none;
    background: #ff0000;
    border-radius: 100%;
    width: 10rem;
    height: 10rem;
    display: inline-block;
    position: absolute;
    margin-left: -5rem;
    margin-top: -5rem;
    left: 50%;
    top: 50%;
  }
  #thebutton:hover {
    cursor: pointer;
    background: #cc0000;
  }
  #thebutton:active {
    background: #ff0000;
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
      <style>{styles}</style>
    </head>
    <body>
      <div id="wrap">
        <div id="thebutton" onclick="window.charge()" />
      </div>
      <script src="https://cdn.socket.io/socket.io-1.2.0.js" />
      <script>{script}</script>
    </body>
  </html>
);

export default base;
