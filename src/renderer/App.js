import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LobbyDashboard from './Components/pages/LobbyDasboard';
import Messages from './Components/pages/Messages';
import './Components/styles/SideBar.css';
import Register from './Components/pages/Register';
import Login from './Components/pages/Login';
import FloorDashboard from './Components/pages/FloorDashboard';
import FloorMessages from './Components/pages/FloorMessages';
import AdminDashboard from './Components/pages/AdminDashboard';
import Clients from './Components/pages/Clients';
import Floors from './Components/pages/Floors';
import Booking from './Components/pages/Booking';
import AdminView from './Components/pages/AdminView';
import FormProvider from './features/hook/FormProvider';
import FloorClients from './Components/pages/FloorClients';
import { useWebSocket } from './features/hook/useWebSocket';
import Settings from './Components/pages/Settings';
import { useState, useEffect } from 'react';
export default function App() {
  const online = useWebSocket('ws://localhost:5000');
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [allClients, setAllClients] = useState(0);
  const [missingClients, setMissingClients] = useState(0);
  const [acceptedClients, setAcceptedClients] = useState(0);
  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('check-update');
  }, []);

  window.electron.ipcRenderer.on('update-available', () => {
    setUpdateAvailable(true);
  });
  window.electron.ipcRenderer.on('update-not-available', () => {
    setUpdateAvailable(false);
  });
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/LobbyDasboard"
          element={
            <FormProvider>
              <LobbyDashboard
                online={online}
                updateAvailable={updateAvailable}
                allClients={allClients}
                missingClients={missingClients}
                acceptedClients={acceptedClients}
              />
            </FormProvider>
          }
        />
        <Route
          path="/Messages"
          element={
            <Messages online={online} updateAvailable={updateAvailable} />
          }
        />
        <Route
          path="/FloorDashboard"
          element={
            <FloorDashboard online={online} updateAvailable={updateAvailable} />
          }
        />
        <Route
          path="/FloorMessages"
          element={
            <FloorMessages online={online} updateAvailable={updateAvailable} />
          }
        />
        <Route
          path="/AdminDashboard"
          element={<AdminDashboard updateAvailable={updateAvailable} />}
        />
        <Route
          path="/Clients"
          element={
            <Clients
              online={online}
              updateAvailable={updateAvailable}
              setAllMyClients={setAllClients}
              setMissingClients={setMissingClients}
              setAcceptedClients={setAcceptedClients}
            />
          }
        />
        <Route
          path="/Register"
          element={<Register updateAvailable={updateAvailable} />}
        />
        <Route
          path="/AdminView"
          element={<AdminView updateAvailable={updateAvailable} />}
        />
        <Route
          path="/Settings"
          element={
            <Settings online={online} updateAvailable={updateAvailable} />
          }
        />
        <Route
          path="/FloorClients"
          element={
            <FloorClients online={online} updateAvailable={updateAvailable} />
          }
        />

        <Route
          path="/Floors"
          element={
            <FormProvider>
              <Floors online={online} updateAvailable={updateAvailable} />
            </FormProvider>
          }
        />
        <Route
          path="/Booking"
          element={
            <Booking online={online} updateAvailable={updateAvailable} />
          }
        />
      </Routes>
    </Router>
  );
}
