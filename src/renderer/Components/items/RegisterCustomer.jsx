import '../styles/RegisterCusomer.css';
import { useState, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerCustomer } from 'renderer/features/customers/customerSlice';
import { getFloors } from 'renderer/features/Floors/floorSlice';
import { reset } from '../../features/customers/customerSlice';
import { reset as resetFloors } from 'renderer/features/Floors/floorSlice';
import { MdCancel } from 'react-icons/md';
import Spinner from '../Utilities/Spinner';
import { sendMessage } from '../../webSocket';
import FormContext from 'renderer/features/hook/FormContext';
import NotificationModal from 'renderer/features/hook/NotificationModal';

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
  const [corporate, setCorporate] = useState(form.corporate);
  const [special, setSpecial] = useState(form.special);
  const [floors, setFloors] = useState([]);
  const [SuccessMessage, setSuccessMessage] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);
  const [inactive, setInactive] = useState(true);
  const inputRef = useRef(null);

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.customer
  );
  const { user } = useSelector((state) => state.auth);
  const floorState = useSelector((state) => state.floor);
  const floorIsSuccess = floorState.isSuccess;
  const buildingfloors = floorState.message;
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
      corporate,
      special,
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
    corporate,
    special,
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
      corporate,
      special,
    };
    dispatch(registerCustomer(customerData));

    // Send the message feature

    const composeMessage = {
      email: String(user.FloorNumber),
      content: `${firstName} ${lastName} wants to come to ${department}. Shall I send ${
        gender === 'male' ? 'him' : 'her'
      }?`,
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
  useEffect(() => {
    dispatch(getFloors());
  }, []);
  useEffect(() => {
    if (floorIsSuccess) {
      setFloors(buildingfloors);
    }
    dispatch(resetFloors());
  }, [floorIsSuccess]);
  useEffect(() => {
    const filteredFloor = floors.filter(
      (floor) => floor.WorkUnit === department
    );
    if (filteredFloor.length) {
      setFloorNumber(filteredFloor[0].FloorNumber);
      setOfficeNumber(filteredFloor[0].OfficeNumber);
    }
  }, [department]);
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
              style={{ position: 'absolute', top: '130px' }}
            >
              Gender
            </p>
            <div className="genderSelection">
              {' '}
              <label htmlFor="female" style={{ fontStyle: 'italic' }}>
                {' '}
                Male
              </label>
              <input
                type="radio"
                value="male"
                name="gender"
                checked={gender === 'male' ? true : null}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
              <label htmlFor="female" style={{ fontStyle: 'italic' }}>
                {' '}
                Female
              </label>
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
              style={{ position: 'absolute', top: '130px' }}
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
                top: '180px',
                WebkitAppearance: 'none',
                MozAppearance: 'textfield',
              }}
            />
            <p
              className="first-name1"
              style={{ position: 'absolute', top: '220px' }}
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
              style={{ position: 'absolute', top: '270px' }}
            />
            <p
              className="last-name"
              style={{ position: 'absolute', top: '220px' }}
            >
              Subcity
            </p>
            <select
              className="CusotmersecondInput"
              required
              id="subcity"
              value={subcity}
              onChange={(e) => {
                setSubCity(e.target.value);
              }}
              style={{ position: 'absolute', top: '270px' }}
            >
              <option value="">Select a subcity</option>
              <option value="Arada">Arada</option>
              <option value="Bole">Bole</option>
              <option value="Yeka">Yeka</option>
              <option value="Addis Ketema">Addis Ketema</option>
              <option value="Kirkos">Kirkos</option>
              <option value="Lideta">Lideta</option>
              <option value="Gulele">Gulele</option>
              <option value="Kolfe Keraniyo">Kolfe Keraniyo</option>
              <option value="Nefas Silk">Nefas Silk</option>
              <option value="other">other</option>
              {/* Add more options as needed */}
            </select>
            <p
              className="first-name1"
              style={{ position: 'absolute', top: '310px' }}
            >
              Work Unit
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
              style={{ position: 'absolute', top: '360px' }}
            />
            <p
              className="last-name"
              style={{ position: 'absolute', top: '310px' }}
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
              style={{ position: 'absolute', top: '360px' }}
            />
            <p
              className="first-name1"
              style={{ position: 'absolute', top: '400px' }}
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
              style={{ position: 'absolute', top: '450px' }}
            />
            <p
              className="last-name"
              style={{ position: 'absolute', top: '400px' }}
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
              style={{ position: 'absolute', top: '450px' }}
            />
            <p
              className="first-name1"
              style={{ position: 'absolute', top: '490px' }}
            >
              Corporate Customer
            </p>
            <p
              className="last-name"
              style={{ position: 'absolute', top: '490px' }}
            >
              Special Case
            </p>
            <div className="CorporateSelection">
              {' '}
              <label htmlFor="Yes" style={{ fontStyle: 'italic' }}>
                Yes
              </label>
              <input
                type="radio"
                value="corporate"
                name="corporate"
                checked={corporate ? true : null}
                onChange={() => {
                  setCorporate(true);
                }}
              />
              <label htmlFor="No" style={{ fontStyle: 'italic' }}>
                {' '}
                No
              </label>
              <input
                type="radio"
                value="corporate"
                name="corporate"
                checked={!corporate ? true : null}
                onChange={() => {
                  setCorporate(false);
                }}
              />
            </div>
            <div className="SpecialSelection ">
              {' '}
              <label htmlFor="Yes" style={{ fontStyle: 'italic' }}>
                Yes
              </label>
              <input
                type="radio"
                value="Special"
                name="Special"
                checked={special ? true : null}
                onChange={() => {
                  setSpecial(true);
                }}
              />
              <label htmlFor="No" style={{ fontStyle: 'italic' }}>
                {' '}
                No
              </label>
              <input
                type="radio"
                value="Special"
                name="Special"
                checked={!special ? true : null}
                onChange={() => {
                  setSpecial(false);
                }}
              />
            </div>
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
                style={{
                  position: 'absolute',
                  top: '690px',
                  cursor: 'not-allowed',
                }}
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
            {SuccessMessage ? <NotificationModal /> : ''}
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
