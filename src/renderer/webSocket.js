import { useState, useEffect } from 'react';
const ws = new WebSocket('ws://localhost:8080');

ws.addEventListener('open', function () {
  console.log('Connected to server');
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
