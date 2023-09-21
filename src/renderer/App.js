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
import FormProvider from './features/hook/FormProvider';
import FloorClients from './Components/pages/FloorClients';
import { useWebSocket } from './features/hook/useWebSocket';
import Settings from './Components/pages/Settings';
export default function App() {
  const online = useWebSocket('ws://localhost:5000');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/LobbyDasboard"
          element={
            <FormProvider>
              <LobbyDashboard online={online} />
            </FormProvider>
          }
        />
        <Route path="/Messages" element={<Messages online={online} />} />
        <Route
          path="/FloorDashboard"
          element={<FloorDashboard online={online} />}
        />
        <Route
          path="/FloorMessages"
          element={<FloorMessages online={online} />}
        />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Clients" element={<Clients online={online} />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Settings" element={<Settings online={online} />} />
        <Route
          path="/FloorClients"
          element={<FloorClients online={online} />}
        />

        <Route
          path="/Floors"
          element={
            <FormProvider>
              <Floors online={online} />
            </FormProvider>
          }
        />
        <Route path="/Booking" element={<Booking online={online} />} />
      </Routes>
    </Router>
  );
}
