import AdminSideBar from '../items/AdminSidebar';
import RegisterLobby from '../items/RegisterLobby';
import RegisterFloors from '../items/RegisterFloors';
import '../styles/AdminNavbar.css';
import { FaUser, FaBuilding } from 'react-icons/fa';
import { useState } from 'react';
const Register = ({ updateAvailable }) => {
  const [selected, setSelected] = useState(1);
  return (
    <>
      <div
        className={selected === 1 ? 'headerOneSelected' : 'headerOne'}
        onClick={() => {
          setSelected(1);
        }}
      >
        <FaUser />
        <p className="headerTtile">Employee</p>
      </div>
      <div
        className="headerTwo"
        className={selected === 2 ? 'headerTwoSelected' : 'headerTwo'}
        onClick={() => {
          setSelected(2);
        }}
      >
        <FaBuilding />
        <p className="headerTtile"> Floors</p>
      </div>
      <AdminSideBar index={3} updateAvailable={updateAvailable} />
      {selected === 1 ? <RegisterLobby /> : <RegisterFloors />}
    </>
  );
};
export default Register;
