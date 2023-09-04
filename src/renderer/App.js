import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LobbyDashboard from './Components/pages/LobbyDasboard';
import Messages from './Components/pages/Messages';
import './Components/styles/SideBar.css';
import RegisterCustomer from './Components/items/RegisterCustomer';
import Register from './Components/pages/Register';
import Login from './Components/pages/Login';
import FloorDashboard from './Components/pages/FloorDashboard';
import FloorMessages from './Components/pages/FloorMessages';
import AdminDashboard from './Components/pages/AdminDashboard';
import Clients from './Components/pages/Clients';
import Floors from './Components/pages/Floors';
import Booking from './Components/pages/Booking';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/LobbyDasboard" element={<LobbyDashboard />} />
        <Route path="/Messages" element={<Messages />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/FloorDashboard" element={<FloorDashboard />} />
        <Route path="/FloorMessages" element={<FloorMessages />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Clients" element={<Clients />} />
        <Route path="/Floors" element={<Floors />} />
        <Route path="/Booking" element={<Booking />} />
      </Routes>
    </Router>
  );
}
