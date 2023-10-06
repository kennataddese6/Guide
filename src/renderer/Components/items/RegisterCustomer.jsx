import '../styles/RegisterCusomer.css';
import { useState, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerCustomer } from 'renderer/features/customers/customerSlice';
import { MdCheckCircle } from 'react-icons/md';
import { reset } from '../../features/customers/customerSlice';
import { MdCancel } from 'react-icons/md';
import Spinner from '../Utilities/Spinner';
import { updateLatestMessage } from '../../features/auth/authSlice';
import { sendMessage } from '../../webSocket';
import FormContext from 'renderer/features/hook/FormContext';
const RegisterCustomer = () => {
  const { form, setForm } = useContext(FormContext);
  const [firstName, setFirstName] = useState(form.firstName);
  const [lastName, setLastName] = useState(form.lastName);
  const [phoneNumber, setPhoneNumber] = useState(form.phoneNumber);
  const [woreda, setWoreda] = useState(form.woreda);
  const [subcity, setSubCity] = useState(form.subcity);
  const [officeNumber, setOfficeNumber] = useState(form.officeNumber);
  const [department, setDepartment] = useState(form.department);
  const [floorNumber, setFloorNumber] = useState(form.floorNumber);
  const [elevatorNumber, setEleveatorNumber] = useState(form.elevatorNumber);
  const [gender, setGender] = useState(form.gender);
  const [SuccessMessage, setSuccessMessage] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);
  const [inactive, setInactive] = useState(true);
  const inputRef = useRef(null);

  //console.log('this is the registered person', role);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.customer
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
  useEffect(() => {
    setForm({
      ...form,
      firstName,
      lastName,
      phoneNumber,
      woreda,
      subcity,
      officeNumber,
      department,
      floorNumber,
      elevatorNumber,
      gender,
    });
  }, [
    firstName,
    lastName,
    phoneNumber,
    woreda,
    subcity,
    officeNumber,
    department,
    floorNumber,
    elevatorNumber,
    gender,
  ]);
  const resetInputs = () => {
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setFloorNumber('');
    setWoreda('');
    setSubCity('');
    setOfficeNumber('');
    setEleveatorNumber('');
    setDepartment('');
    setGender('');
    setErrorMessage(false);
    setSuccessMessage(false);
  };
  const handleSubmit = () => {
    const customerData = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      woreda: woreda,
      subcity: subcity,
      officeNumber: officeNumber,
      department: department,
      floorNumber: floorNumber,
      elevatorNumber: elevatorNumber,
      gender: gender,
      regiseterdBy: user.Email,
      booking: false,
    };
    dispatch(registerCustomer(customerData));
    const composedMessage = {
      content:
        firstName +
        ' ' +
        lastName +
        ' wants to come to ' +
        department +
        ' shall I send him? ',
      to: floorNumber,
    };
    dispatch(updateLatestMessage(composedMessage));
    // Send the message feature

    const composeMessage = {
      email: String(user.FloorNumber),
      content: `${firstName} ${lastName} wants to come to ${department}. Shall I send him?`,
      address: floorNumber,
    };
    sendMessage(composeMessage);
    resetInputs();
  };
  const handleContextMenu = (event) => {
    event.preventDefault();
    document.execCommand('paste');
  };
  useEffect(() => {
    setInactive(
      firstName === '' ||
        lastName === '' ||
        gender === '' ||
        phoneNumber === '' ||
        woreda === '' ||
        subcity === '' ||
        department === '' ||
        floorNumber === '' ||
        officeNumber === '' ||
        elevatorNumber === ''
    );
  }, [
    firstName,
    lastName,
    gender,
    phoneNumber,
    woreda,
    subcity,
    department,
    floorNumber,
    officeNumber,
    elevatorNumber,
  ]);
  return (
    <>
      <div className="dashboard">
        <div className="div">
          <div className="container">
            {isLoading && <Spinner />}
            <h3 className="formHeaderLobby"> Register Customer </h3>
            <p className="first-name1">First Name</p>
            <p className="last-name">Last Name</p>
            <input
              className="CusotmerfirstInput"
              type="text"
              required
              id="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />{' '}
            <input
              className="CusotmersecondInput"
              type="text"
              required
              id="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <p
              className="first-name1"
              style={{ position: 'absolute', top: '180px' }}
            >
              Gender
            </p>
            <div className="genderSelection">
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
            <p
              className="last-name"
              style={{ position: 'absolute', top: '180px' }}
            >
              Phone Number
            </p>
            <input
              className="CusotmersecondInput noNumberSpin"
              type="number"
              required
              id="phone"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              style={{
                position: 'absolute',
                top: '240px',
                WebkitAppearance: 'none',
                MozAppearance: 'textfield',
              }}
            />
            <p
              className="first-name1"
              style={{ position: 'absolute', top: '280px' }}
            >
              Woreda
            </p>
            <input
              className="CusotmerfirstInput"
              type="number"
              required
              id="woreda"
              value={woreda}
              onChange={(e) => {
                setWoreda(e.target.value);
              }}
              style={{ position: 'absolute', top: '340px' }}
            />
            <p
              className="last-name"
              style={{ position: 'absolute', top: '280px' }}
            >
              Subcity
            </p>
            <input
              className="CusotmersecondInput"
              type="number"
              required
              id="subcity"
              value={subcity}
              onChange={(e) => {
                setSubCity(e.target.value);
              }}
              style={{ position: 'absolute', top: '340px' }}
            />
            <p
              className="first-name1"
              style={{ position: 'absolute', top: '380px' }}
            >
              Departemnt
            </p>
            <input
              className="CusotmerfirstInput"
              type="text"
              required
              id="department"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              ref={inputRef}
              onContextMenu={handleContextMenu}
              style={{ position: 'absolute', top: '440px' }}
            />
            <p
              className="last-name"
              style={{ position: 'absolute', top: '380px' }}
            >
              Floor Number
            </p>
            <input
              className="CusotmersecondInput"
              type="number"
              required
              id="floorNumber"
              value={floorNumber}
              onChange={(e) => {
                setFloorNumber(e.target.value);
              }}
              style={{ position: 'absolute', top: '440px' }}
            />
            <p
              className="first-name1"
              style={{ position: 'absolute', top: '480px' }}
            >
              Office Number
            </p>
            <input
              className="CusotmerfirstInput"
              type="number"
              required
              id="officeNumber"
              value={officeNumber}
              onChange={(e) => {
                setOfficeNumber(e.target.value);
              }}
              style={{ position: 'absolute', top: '540px' }}
            />
            <p
              className="last-name"
              style={{ position: 'absolute', top: '480px' }}
            >
              Elevator Number
            </p>
            <input
              className="CusotmersecondInput"
              type="number"
              required
              id="elevatorNumber"
              value={elevatorNumber}
              onChange={(e) => {
                setEleveatorNumber(e.target.value);
              }}
              style={{ position: 'absolute', top: '540px' }}
            />
            <p className="intention">Intention of visit</p>
            <input
              className="intentionVisit"
              type="text"
              required
              id="providerName"
              placeholder="(optional)"
            />
            {inactive ? (
              <div
                className="submitButInactive"
                style={{ position: 'absolute', top: '690px' }}
              >
                Submit
              </div>
            ) : (
              <div
                className="submitBut"
                style={{ position: 'absolute', top: '690px' }}
                onClick={handleSubmit}
              >
                Submit
              </div>
            )}
            {SuccessMessage ? (
              <div
                style={{
                  position: 'absolute',
                  top: '93%',
                  left: '51%',
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
                  top: '93%',
                  left: '41%',
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

export default RegisterCustomer;
