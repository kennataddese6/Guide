import AdminSideBar from '../items/AdminSidebar';
import RegisterLobby from '../items/RegisterLobby';
import '../styles/AdminNavbar.css';
const Register = () => {
  return (
    <>
      <div className="headerOne"> Employee</div>
      <div className="headerTwo">Floors</div>
      <AdminSideBar index={3} />
      <RegisterLobby />
    </>
  );
};
export default Register;
