import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LobbyDashboard from './Components/pages/LobbyDasboard';
import Messages from './Components/pages/Messages';
import './Components/styles/SideBar.css';
import RegisterCustomer from './Components/items/RegisterCustomer';
import Register from './Components/pages/Register';
import Login from './Components/pages/Login';
import FloorDashboard from './Components/pages/FloorDashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/LobbyDasboard" element={<LobbyDashboard />} />
        <Route path="/Messages" element={<Messages />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/FloorDashboard" element={<FloorDashboard />} />
      </Routes>
    </Router>
  );
}
