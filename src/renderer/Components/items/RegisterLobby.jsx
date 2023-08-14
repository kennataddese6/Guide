import '../styles/RegisterLobby.css';
const RegisterLobby = () => {
  return (
    <>
      <div className="LobbyContainer">
        <div className="frame">
          <div className="div">
            <div className="register-employee">Register Employee</div>
            <input className="firstNameInput" type="text" />
            <div className="overlap-group">
              <input className="lastNameInput" type="text" />
            </div>
            <input className="emailInput" type="text" />

            <input className="phoneInput" type="text" />

            <div className="text-wrapper">Email</div>
            <div className="text-wrapper-4">First Name</div>
            <div className="text-wrapper-3">Last Name</div>
            <div className="text-wrapper-2">Phone Number</div>
            <div className="text-wrapper-5">Floor Number</div>
            <input className="floorNumberInput" type="number" />
            <div className="submitButton">
              <div className="text-wrapper-6">Submit</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterLobby;
