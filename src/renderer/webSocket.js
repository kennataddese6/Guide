import { useState, useEffect } from 'react';
const ws = new WebSocket('ws://localhost:5000');

ws.addEventListener('open', function () {
  ws.send(JSON.stringify({ email: 'kennataddese6@gmail.com' })); // this line
});

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
  } catch (error) {
    console.log('An error has occured.server Disconnected');
  }
};

export { sendMessage };
