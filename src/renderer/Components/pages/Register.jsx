import RegisterCustomer from '../items/RegisterCustomer';
import SideBar from '../items/SideBar';
const Register = () => {
  return (
    <>
      <div className="dashboard">
        <div className="div">
          <SideBar />
          <RegisterCustomer />
        </div>
      </div>
    </>
  );
};
export default Register;
