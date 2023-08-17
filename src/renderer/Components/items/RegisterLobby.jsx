import '../styles/RegisterLobby.css';
import { register } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { reset } from '../../features/auth/authSlice';
import { MdCancel, MdError } from 'react-icons/md';
import Spinner from '../Utilities/Spinner';
const RegisterLobby = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [SuccessMessage, setSuccessMessage] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);
  const { isLoading, isError, isSuccess } = useSelector((state) => state.auth);
  const resetInputs = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setFloorNumber('');
    setErrorMessage(false);
    setSuccessMessage(false);
  };
  useEffect(() => {
    if (isSuccess) {
      setErrorMessage(false);
      console.log('the operation has succeded');
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
