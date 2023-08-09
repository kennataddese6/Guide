import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import { useEffect } from 'react';
import { sendMessage } from 'renderer/webSocket';
import './App.css';
//const { Notification } = require('electron');
function Hello() {
  const showNotification = () => {
    console.log('hello I am clicked');
    window.electron.ipcRenderer.sendMessage('show-notification', {
      title: 'New Customer',
      body: 'Abebe balcha to System Development and customization',
    });
  };
  const handleNotificationClick = () => {
    // Perform the app redirect here
    // For example:
    //window.location.href = '/path/to/redirect';
    const currentPath = window.location.pathname;
    window.location.href = currentPath;
    console.log('i am clicked on this bar');
  };
  const sendMessages = () => {
    console.log('I am clicked');
    sendMessage('Mr X to System Development and customization');
  };
  useEffect(() => {
    window.electron.ipcRenderer.on(
      'notification-clicked',
      handleNotificationClick
    );
    return () => {};
  }, []);
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <div>
          <button onClick={showNotification}>Show Notification</button>
        </div>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
        <button onClick={sendMessages}>Send Message</button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
