import React from 'react';
import { useState, useEffect } from 'react';
import { registerFloor } from 'renderer/features/Floors/floorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from 'renderer/features/Floors/floorSlice';
import Spinner from '../Utilities/Spinner';
import { MdCancel, MdCheckCircle } from 'react-icons/md';

const RegisterFloors = () => {
  const dispatch = useDispatch();
  const [workUnit, setWorkUnit] = useState('');
  const [divison, setDivison] = useState('');
  const [department, setDepartment] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [officeNumber, setOfficeNumber] = useState('');
  const [SuccessMessage, setSuccessMessage] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const { isLoading, isSuccess, isError } = useSelector((state) => state.floor);
  const resetInputs = () => {
    setWorkUnit('');
    setDivison('');
    setDepartment('');
    setFloorNumber('');
    setOfficeNumber('');
  };

  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage(true);
    }
    if (isError) {
      setErrorMessage(true);
    }
    dispatch(reset());
  }, [isSuccess, isError]);

  const handleSubmit = () => {
    const Floor = {
      workUnit: workUnit,
      divison: divison,
      department: department,
      floorNumber: floorNumber,
      officeNumber: officeNumber,
    };
    console.log('This is the floor to be dispacted', Floor);
    dispatch(registerFloor(Floor));
    resetInputs();
  };
  useEffect(() => {
    if (
      workUnit === '' ||
      divison === '' ||
      department === '' ||
      floorNumber === '' ||
      officeNumber === ''
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [workUnit, divison, department, floorNumber, officeNumber]);
  return (
    <>
      <div className="LobbyContainer">
        <div className="frame">
          <div className="div" style={{ height: '622px' }}>
            <div className="register-employee">
              Register Building Work Units
            </div>
            {isLoading && <Spinner />}
            <input
              className="firstNameInput"
              type="text"
              style={{ width: '349px' }}
              value={workUnit}
              onChange={(e) => {
                setWorkUnit(e.target.value);
              }}
            />
            <div className="overlap-group"></div>
            <input
              className="emailInput"
              type="text"
              value={divison}
              onChange={(e) => {
                setDivison(e.target.value);
              }}
              style={{ width: '349px' }}
            />
            <input
              className="phoneInput"
              type="text"
              style={{ width: '349px' }}
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            />
            <input
              className="phoneInput"
              type="number"
              style={{ width: '136px', position: 'absolute', top: '438px' }}
              value={floorNumber}
              onChange={(e) => {
                setFloorNumber(e.target.value);
              }}
            />
            <input
              className="phoneInput"
              type="number"
              style={{
                width: '136px',
                position: 'absolute',
                top: '438px',
                left: '279px',
              }}
              value={officeNumber}
              onChange={(e) => {
                setOfficeNumber(e.target.value);
              }}
            />
            <div className="text-wrapper-4">Work Unit</div>
            <div className="text-wrapper">Department</div>
            <div className="text-wrapper-2">Divison</div>
            <div
              className="text-wrapper-2"
              style={{ position: 'absolute', top: '396px' }}
            >
              Floor Number
            </div>
            <div
              className="text-wrapper-2"
              style={{ position: 'absolute', top: '396px', left: '279px' }}
            >
              Office Number
            </div>
            {disableButton ? (
              <div
                className="submitButton"
                style={{
                  position: 'absolute',
                  top: '502px',
                  backgroundColor: 'grey',
                  cursor: 'not-allowed',
                }}
              >
                <div className="text-wrapper-6">Submit</div>
              </div>
            ) : (
              <div
                className="submitButton"
                onClick={handleSubmit}
                style={{ position: 'absolute', top: '502px' }}
              >
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
export default RegisterFloors;
