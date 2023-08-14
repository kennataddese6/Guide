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

  const handleSubmit = () => {
    console.log('first name:', firstName);
    console.log('first name:', lastName);
    console.log('first name:', email);
    console.log('first name:', phoneNumber);
    console.log('first name:', floorNumber);
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      floorNumber: floorNumber,
    };
    dispatch(register(userData));
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
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <div className="overlap-group">
              <input
                className="lastNameInput"
                type="text"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <input
              className="emailInput"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <input
              className="phoneInput"
              type="text"
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
