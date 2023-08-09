const ws = new WebSocket('ws://localhost:8080');

ws.addEventListener('open', function () {
  console.log('Connected to server');
});

ws.addEventListener('message', function (event) {
  console.log('Received message:', event.data);
});

const sendMessage = (message) => {
  ws.send(message);
};

export { sendMessage };
