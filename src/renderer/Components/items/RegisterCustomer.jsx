import SideBar from './SideBar';
import '../styles/RegisterCusomer.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerCustomer } from 'renderer/features/customers/customerSlice';
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

  const dispatch = useDispatch();

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
  };
  return (
    <>
      <div className="dashboard">
        <div className="div">
          <div className="container">
            <div className="rectangle-parent">
              <div className="frame-child" />
              <input
                className="frame-item"
                type="number"
                placeholder="Floor Number"
                required
                id="floorNumber"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterCustomer;
