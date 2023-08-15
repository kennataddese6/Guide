import '../styles/RegisterLobby.css';
import { register } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
const RegisterLobby = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [floorNumber, setFloorNumber] = useState('');

  const resetInputs = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setFloorNumber('');
  };
  const handleSubmit = () => {
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      floorNumber: floorNumber,
    };
    dispatch(register(userData));
    resetInputs();
  };

  return (
    <>
      <div className="LobbyContainer">
        <div className="frame">
          <div className="div">
            <div className="register-employee">Register Employee</div>
            <input
              className="firstNameInput"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <div className="overlap-group">
              <input
                className="lastNameInput"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <input
              className="emailInput"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <input
              className="phoneInput"
              type="text"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />

            <div className="text-wrapper">Email</div>
            <div className="text-wrapper-4">First Name</div>
            <div className="text-wrapper-3">Last Name</div>
            <div className="text-wrapper-2">Phone Number</div>
            <div className="text-wrapper-5">Floor Number</div>
            <input
              className="floorNumberInput"
              type="number"
              value={floorNumber}
              onChange={(e) => {
                setFloorNumber(e.target.value);
              }}
            />
            <div className="submitButton" onClick={handleSubmit}>
              <div className="text-wrapper-6">Submit</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterLobby;
