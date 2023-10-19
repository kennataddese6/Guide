import '../styles/RegisterLobby.css';
import { registerCustomer } from 'renderer/features/customers/customerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { reset } from '../../features/customers/customerSlice';
import { MdCancel } from 'react-icons/md';
import Spinner from '../Utilities/Spinner';
import { updateLatestMessage } from 'renderer/features/auth/authSlice';
import useRefresh from 'renderer/features/hook/useRefresh';
const BookCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setRefresh } = useRefresh();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [woreda, setWoreda] = useState('');
  const [subcity, setSubCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [officeNumber, setOfficeNumber] = useState('');
  const [SuccessMessage, setSuccessMessage] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { isSuccess, isLoading, isError } = useSelector(
    (state) => state.customer
  );
  const [floorNumber, setFloorNumber] = useState(user ? user.FloorNumber : '');
  const [gender, setGender] = useState();

  const resetInputs = () => {
    setFirstName('');
    setLastName('');
    setWoreda('');
    setPhoneNumber('');
    setSubCity('');
    setDepartment('');
    setOfficeNumber('');
    setGender('');
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
      woreda: woreda,
      subcity: subcity,
      department: department,
      officeNumber: officeNumber,
      gender: gender,
      booking: true,
    };
    dispatch(registerCustomer(userData));
    const composedMessage = {
      content: `Mr  ${firstName} ${lastName} will be visiting ${department}. Please Let him in When he arrives`,
      to: user ? user.FloorNumber : '',
    };
    dispatch(updateLatestMessage(composedMessage));
    setRefresh(true);

    resetInputs();
  };
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);
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
            {isLoading && <Spinner />}
            <div className="register-employee">Book a Customer</div>
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
              value={subcity}
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
              style={{ position: 'absolute', top: '426px', width: '349px' }}
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            />
            <input
              className="phoneInput"
              type="number"
              style={{ position: 'absolute', top: '510px' }}
              value={officeNumber}
              onChange={(e) => {
                setOfficeNumber(e.target.value);
              }}
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
              Office Number
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
              className="text-wrapper-5"
              style={{ position: 'absolute', top: '470px', left: '279px' }}
            >
              Gender
            </div>
            <div
              className="genderSelection"
              style={{ position: 'absolute', top: '510px', left: '279px' }}
            >
              {' '}
              <label htmlFor="female"> Male</label>
              <input
                type="radio"
                value="male"
                name="gender"
                checked={gender === 'male' ? true : null}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
              <label htmlFor="female"> Female</label>
              <input
                type="radio"
                value="female"
                name="gender"
                checked={gender === 'female' ? true : null}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
            </div>
            <div
              className="submitButton"
              style={{ position: 'absolute', top: '600px' }}
              onClick={handleSubmit}
            >
              <div className="text-wrapper-6">Submit</div>
            </div>
            {SuccessMessage ? (
              <div
                style={{
                  position: 'absolute',
                  top: '91%',
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
                  top: '91%',
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
