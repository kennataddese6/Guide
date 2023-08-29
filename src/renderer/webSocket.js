const ws = new WebSocket('ws://localhost:5000');

ws.addEventListener('message', function (event) {
  window.electron.ipcRenderer.sendMessage('show-notification', {
    title: 'New Message',
    body: event.data,
  });
  console.log('Received message:', event.data);
});

const sendMessage = (message) => {
  try {
    ws.send(JSON.stringify(message));
    console.log('I have sent the message');
  } catch (error) {
    console.log('An error has occured.server Disconnected');
  }
};

export { sendMessage,ws };
