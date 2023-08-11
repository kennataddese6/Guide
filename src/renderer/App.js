import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import icon from '../../assets/icon.svg';
import { useEffect, useState } from 'react';
import { sendMessage } from 'renderer/webSocket';
import './App.css';
import LobbyDashboard from './Components/pages/LobbyDasboard';
import Messages from './Components/pages/Messages';
import './Components/styles/SideBar.css';
import RegisterCustomer from './Components/items/RegisterCustomer';
import Register from './Components/pages/Register';
function Hello() {
  const [text, setText] = useState('');
  const navigate = useNavigate();

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
    sendMessage(text);
  };
  useEffect(() => {
    window.electron.ipcRenderer.on(
      'notification-clicked',
      handleNotificationClick
    );
    return () => {};
  }, []);
  const toLobbyDashboard = () => {
    navigate('/LobbyDasboard');
  };
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

        <button type="button" onClick={toLobbyDashboard}>
          <span role="img" aria-label="folded hands">
            🙏
          </span>
          Donate
        </button>
        <button onClick={sendMessages}>Send Message</button>
        <input
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/LobbyDasboard" element={<LobbyDashboard />} />
        <Route path="/Messages" element={<Messages />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}
