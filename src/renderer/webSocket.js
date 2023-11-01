const ws = new WebSocket('ws://localhost:5000');

ws.addEventListener('message', function (event) {
  window.electron.ipcRenderer.sendMessage('show-notification', {
    title: 'New Message',
    body: event.data,
  });
});

const sendMessage = (message) => {
  try {
    ws.send(JSON.stringify(message));
  } catch (error) {
    return error;
  }
};

export { sendMessage, ws };
