import RegisterCustomer from '../items/RegisterCustomer';
import SideBar from '../items/SideBar';
import RegisterLobby from '../items/RegisterLobby';
const Register = () => {
  return (
    <>
      <div className="dashboard">
        <div className="div">
          <SideBar index={3} />
          <RegisterLobby />
        </div>
      </div>
    </>
  );
};
export default Register;
