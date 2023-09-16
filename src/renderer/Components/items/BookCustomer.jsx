import '../styles/RegisterLobby.css';
import { register } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { reset } from '../../features/auth/authSlice';
import { MdCancel } from 'react-icons/md';
import Spinner from '../Utilities/Spinner';
const BookCustomer = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [woreda, setWoreda] = useState('');
  const [subCity, setSubCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [SuccessMessage, setSuccessMessage] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);
  const { isLoading, isError, isSuccess, user } = useSelector(
    (state) => state.auth
  );
  const [floorNumber, setFloorNumber] = useState(user.FloorNumber);

  const resetInputs = () => {
    setFirstName('');
    setLastName('');
    setWoreda('');
    setPhoneNumber('');
    setFloorNumber('');
    setErrorMessage(false);
    setSuccessMessage(false);
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
      phoneNumber: phoneNumber,
      floorNumber: floorNumber,
    };
    console.log('This is the user data', userData);
    resetInputs();
  };

  return (
    <>
      <div className="LobbyContainer">
        <div className="frame">
          <div
            className="div"
            style={{
              height: '700px',
            }}
          >
            <div className="register-employee">Book a Customer</div>
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
              className="woredaInput"
              type="text"
              value={woreda}
              onChange={(e) => {
                setWoreda(e.target.value);
              }}
            />
            <input
              className="subcityInput"
              type="text"
              value={subCity}
              onChange={(e) => {
                setSubCity(e.target.value);
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
            <input
              className="phoneInput"
              type="number"
              style={{ position: 'absolute', top: '426px', width: '349px' }}
            />
            <input
              className="phoneInput"
              type="number"
              style={{ position: 'absolute', top: '510px', width: '349px' }}
            />
            <div className="text-wrapper">Woreda</div>
            <div className="text-wrapper-7">Subcity</div>
            <div className="text-wrapper-4">First Name</div>
            <div className="text-wrapper-3">Last Name</div>
            <div className="text-wrapper-2">Phone Number</div>
            <div className="text-wrapper-5">Floor Number</div>
            <div
              className="text-wrapper-2"
              style={{ position: 'absolute', top: '382px' }}
            >
              Department
            </div>
            <div
              className="text-wrapper-2"
              style={{ position: 'absolute', top: '470px' }}
            >
              Work Unit
            </div>
            <input
              className="floorNumberInput"
              type="number"
              value={floorNumber}
              onChange={(e) => {
                setFloorNumber(e.target.value);
              }}
            />
            <div
              className="submitButton"
              style={{ position: 'absolute', top: '600px' }}
            >
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
export default BookCustomer;
