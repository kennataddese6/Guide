import '../styles/RegisterLobby.css';
import { register } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { reset } from '../../features/auth/authSlice';
import { MdCancel } from 'react-icons/md';
import Spinner from '../Utilities/Spinner';
const RegisterLobby = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [SuccessMessage, setSuccessMessage] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const { isLoading, isError, isSuccess } = useSelector((state) => state.auth);
  const resetInputs = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setFloorNumber('');
    setSelectedRole('');
    setErrorMessage(false);
    setSuccessMessage(false);
  };
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  useEffect(() => {
    if (isSuccess) {
      setErrorMessage(false);
      setSuccessMessage(true);
    }
    if (isError) {
      setSuccessMessage(false);
      setErrorMessage(true);
    }
    dispatch(reset());
  }, [isSuccess, isError]);
  const handleSubmit = () => {
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      floorNumber: floorNumber,
      role: Number(selectedRole),
    };
    dispatch(register(userData));
    resetInputs();
  };
  useEffect(() => {
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      phoneNumber === '' ||
      floorNumber === '' ||
      selectedRole === ''
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [firstName, lastName, email, phoneNumber, floorNumber, selectedRole]);

  return (
    <>
      <div className="LobbyContainer">
        <div className="frame">
          <div className="div">
            <div className="register-employee">Register Employee</div>
            {isLoading && <Spinner />}

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
              type="number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <select
              className="lastNameInput"
              value={selectedRole}
              onChange={handleRoleChange}
              style={{ position: 'absolute', top: '256px', left: '279px' }}
            >
              <option value="">Select a role</option>
              <option value="7706">Admin</option>
              <option value="1000">Lobby Receptionist</option>
              <option value="4800">Floor Receptionist</option>
            </select>

            <div className="text-wrapper">Email</div>
            <div className="text-wrapper-4">First Name</div>
            <div className="text-wrapper-3">Last Name</div>
            <div
              className="text-wrapper-3"
              style={{ position: 'absolute', top: '213px' }}
            >
              Role
            </div>
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
            {disableButton ? (
              <div
                className="submitButton"
                style={{ backgroundColor: 'grey', cursor: 'not-allowed' }}
              >
                <div className="text-wrapper-6">Submit</div>
              </div>
            ) : (
              <div className="submitButton" onClick={handleSubmit}>
                <div className="text-wrapper-6">Submit</div>
              </div>
            )}

            {SuccessMessage ? (
              <div
                style={{
                  position: 'absolute',
                  top: '85%',
                  color: 'green',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <MdCheckCircle color="green" />
                <h4> Success</h4>
              </div>
            ) : (
              ''
            )}

            {ErrorMessage ? (
              <div
                style={{
                  position: 'absolute',
                  top: '85%',
                  color: 'red',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <MdCancel color="red" />
                <h4> Error. Something went wrong</h4>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterLobby;
