import { useState, useEffect } from 'react';

export const useWebSocket = (url) => {
  const [ws, setWs] = useState(new WebSocket(url));
  const [online, setOnline] = useState(ws.readyState === WebSocket.OPEN);
  const [retryCount, setRetryCount] = useState(0);

  const handleClose = (event) => {
    setOnline(false);
    console.log('Sorry I am disconnected');
    // Calculate the delay before attempting to reconnect
    const delay = Math.min(1000 * 2 ** retryCount, 30000);
    // Attempt to reconnect after the specified delay
    setTimeout(() => {
      reconnect();
      // Increment the retry count
      setRetryCount((count) => count + 1);
    }, delay);
  };

  const handleOpen = (event) => {
    setOnline(true);
    console.log('hello I am connected');
    // Reset the retry count when the connection is re-established
    setRetryCount(0);
  };

  const reconnect = () => {
    // Close the existing WebSocket connection
    ws.close();
    // Create a new WebSocket object
    const newWs = new WebSocket(url);
    // Update the state
    setWs(newWs);
  };

  useEffect(() => {
    ws.addEventListener('close', handleClose);
    ws.addEventListener('open', handleOpen);
    return () => {
      ws.removeEventListener('close', handleClose);
      ws.removeEventListener('open', handleOpen);
    };
  }, [ws]);

  return online;
};
