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
  const [SuccessMessage, setSuccessMessage] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);
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
      email: user.FloorNumber,
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
  return (
    <>
      <div className="dashboard">
        <div className="div">
          <div className="container">
            <div className="rectangle-parent">
              <div className="frame-child" />
              {isLoading && <Spinner />}
              <input
                className="frame-item"
                type="number"
                required
                id="floorNumber"
                value={floorNumber}
                onChange={(e) => {
                  setFloorNumber(e.target.value);
                }}
              />
              <div className="registration-form"> Register Customer</div>
              <input
                className="frame-inner"
                type="text"
                required
                id="firstName"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <div className="first-name">
                <p className="first-name1">First Name</p>
              </div>
              <div className="rectangle-group">
                <input
                  className="rectangle-input"
                  type="text"
                  required
                  id="lastName"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <div className="last-name">Last Name</div>
              </div>
              <input
                className="frame-child1"
                type="tel"
                required
                id="phone"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
              <div className="phone">
                <p className="first-name1">Phone</p>
              </div>
              <input
                className="frame-child2"
                type="text"
                required
                id="woreda"
                value={woreda}
                onChange={(e) => {
                  setWoreda(e.target.value);
                }}
              />
              <div className="woreda">
                <p className="first-name1">Woreda</p>
              </div>
              <input
                className="frame-child3"
                type="text"
                required
                id="subcity"
                value={subcity}
                onChange={(e) => {
                  setSubCity(e.target.value);
                }}
              />
              <div className="subcity">
                <p className="first-name1">Subcity</p>
              </div>
              <input
                className="frame-child4"
                type="text"
                required
                id="providerName"
              />
              <input
                className="frame-child5"
                type="number"
                required
                id="officeNumber"
                value={officeNumber}
                onChange={(e) => {
                  setOfficeNumber(e.target.value);
                }}
              />
              <div className="provider-name">
                <p className="first-name1">Provider Name</p>
              </div>
              <div className="office-number">
                <p className="first-name1">Office Number</p>
              </div>
              <div className="floor-number">
                <p className="first-name1">Floor Number</p>
              </div>
              <input
                className="frame-child6"
                type="text"
                required
                id="department"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
                ref={inputRef}
                onContextMenu={handleContextMenu}
              />
              <div className="department">
                <p className="first-name1">Department</p>
              </div>
              <input
                className="frame-child7"
                type="number"
                required
                id="elevatorNumber"
                value={elevatorNumber}
                onChange={(e) => {
                  setEleveatorNumber(e.target.value);
                }}
              />
              <div className="elevator-number">
                <p className="first-name1">Elevator Number</p>
              </div>
              <input className="frame-child8" type="text" id="pre-request" />
              <div className="pre-request">
                <p className="first-name1">Pre-request</p>
              </div>
              <button className="submit" onClick={handleSubmit}>
                Submit
              </button>
              <div className="ellipse-div" />
              <input className="frame-child11" type="radio" required />
              <input className="frame-child12" type="radio" required />
              <div className="male">Male</div>
              <div className="female">Female</div>
            </div>
            {SuccessMessage ? (
              <div
                style={{
                  position: 'absolute',
                  top: '70%',
                  left: '38%',
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
                  top: '70%',
                  left: '38%',
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
