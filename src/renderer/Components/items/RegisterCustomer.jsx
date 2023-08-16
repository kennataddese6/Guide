import SideBar from './SideBar';
import '../styles/RegisterCusomer.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerCustomer } from 'renderer/features/customers/customerSlice';
import { MdCheckCircle } from 'react-icons/md';
import { reset } from '../../features/customers/customerSlice';
import { MdCancel, MdError } from 'react-icons/md';
import Spinner from '../Utilities/Spinner';
const RegisterCustomer = ({ role }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [woreda, setWoreda] = useState('');
  const [subcity, setSubCity] = useState('');
  const [officeNumber, setOfficeNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [elevatorNumber, setEleveatorNumber] = useState('');
  const [SuccessMessage, setSuccessMessage] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);
  //console.log('this is the registered person', role);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.customer
  );
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
    };
    console.log(customerData);
    dispatch(registerCustomer(customerData));
    resetInputs();
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
                placeholder="Floor Number"
                required
                id="floorNumber"
                value={floorNumber}
                onChange={(e) => {
                  setFloorNumber(e.target.value);
                }}
              />
              <div className="registration-form"> Registration Form</div>
              <input
                className="frame-inner"
                type="text"
                placeholder="First Name"
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
                  placeholder="Last Name"
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
                placeholder="Phone"
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
                placeholder="Woreda"
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
                placeholder="Subcity"
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
                placeholder="Provider Name"
                required
                id="providerName"
              />
              <input
                className="frame-child5"
                type="number"
                placeholder="Office Number"
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
                placeholder="Department"
                required
                id="department"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
              />
              <div className="department">
                <p className="first-name1">Department</p>
              </div>
              <input
                className="frame-child7"
                type="number"
                placeholder="Elevator Number"
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
              <input
                className="frame-child8"
                type="text"
                placeholder="Pre-request"
                id="pre-request"
              />
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
