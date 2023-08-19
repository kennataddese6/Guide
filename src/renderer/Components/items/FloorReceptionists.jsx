import '../styles/FloorRecetionists.css';
import Conversations from './Conversations';
import { useEffect, useState } from 'react';
import { getFloorReceptionists } from 'renderer/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
const FloorReceptionists = ({ selectedFloor, setSelectedFloor }) => {
  const dispatch = useDispatch();
  const [floorReceptionists, setFloorReceptionists] = useState([]);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const passFloorNumber = (number) => {
    setSelectedFloor(number);
  };
  useEffect(() => {
    dispatch(getFloorReceptionists());
  }, []);
  useEffect(() => {
    if (isSuccess) {
      console.log('this is the message to be setted', message);
      setFloorReceptionists(message);
    }
  }, [isSuccess]);
  return (
    <>
      {floorReceptionists ? (
        floorReceptionists.map((floorReceptionist) => (
          <div
            className="ReceptionistContainer"
            style={{
              backgroundColor: selectedFloor === 1 ? 'lightblue' : 'white',
            }}
            onClick={() => {
              passFloorNumber(floorReceptionist.FloorNumber);
            }}
          >
            <h3 className="ReceptionistName">
              {floorReceptionist.FirstName + ' '}
              {floorReceptionist.LastName} ({floorReceptionist.FloorNumber})
              Floor
            </h3>
            <p className="messageContent">
              {' '}
              I have sent Mr.Tewodros to Sdc 13th..
            </p>
            <p className="TimeandDate"> 7/19/2013</p>
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default FloorReceptionists;
