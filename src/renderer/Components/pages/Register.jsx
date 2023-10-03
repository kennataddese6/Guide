import AdminSideBar from '../items/AdminSidebar';
import RegisterLobby from '../items/RegisterLobby';
import '../styles/AdminNavbar.css';
import { FaUser, FaBuilding } from 'react-icons/fa';

const Register = () => {
  return (
    <>
      <div className="headerOne">
        <FaUser />
        <p className="headerTtile">Employee</p>
      </div>
      <div className="headerTwo">
        <FaBuilding />
        <p className="headerTtile"> Floors</p>
      </div>
      <AdminSideBar index={3} />
      <RegisterLobby />
    </>
  );
};
export default Register;
