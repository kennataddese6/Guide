import { useState, useEffect } from 'react';

export const useWebSocket = (url) => {
  const [ws, setWs] = useState(null);
  const [online, setOnline] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleClose = () => {
    setOnline(false);
    const delay = Math.min(1000 * 2 ** retryCount, 30000);
    setTimeout(() => {
      reconnect();
      setRetryCount((count) => count + 1);
    }, delay);
  };

  const handleOpen = () => {
    setOnline(true);
    setRetryCount(0);
  };

  const reconnect = () => {
    if (ws) {
      ws.close();
    }
    setWs(new WebSocket(url));
  };

  useEffect(() => {
    setWs(new WebSocket(url));
  }, [url]);

  useEffect(() => {
    if (ws) {
      ws.addEventListener('close', handleClose);
      ws.addEventListener('open', handleOpen);
      return () => {
        ws.removeEventListener('close', handleClose);
        ws.removeEventListener('open', handleOpen);
        ws.close();
      };
    }
  }, [ws]);

  return online;
};
