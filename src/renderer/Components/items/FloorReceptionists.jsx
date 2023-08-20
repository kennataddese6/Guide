import '../styles/FloorRecetionists.css';
import Conversations from './Conversations';
import { useEffect, useState } from 'react';
import { getFloorReceptionists } from 'renderer/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from 'renderer/features/auth/authSlice';
const FloorReceptionists = ({ selectedFloor, setSelectedFloor }) => {
  const dispatch = useDispatch();
  const [floorReceptionists, setFloorReceptionists] = useState([]);
  const { isLoading, isError, isSuccessgetFloorReceptionists, message } =
    useSelector((state) => state.auth);
  const passFloorNumber = (number) => {
    setSelectedFloor(number);
  };
  useEffect(() => {
    dispatch(getFloorReceptionists());
  }, []);
  useEffect(() => {
    if (isSuccessgetFloorReceptionists) {
      console.log('this is the message to be setted', message);
      setFloorReceptionists(message);
    }
    dispatch(reset());
  }, [isSuccessgetFloorReceptionists]);
  return (
    <>
      {floorReceptionists ? (
        floorReceptionists.map((floorReceptionist) => {
          return (
            <div
              className="ReceptionistContainer"
              style={{
                backgroundColor:
                  selectedFloor === floorReceptionist.FloorNumber
                    ? 'lightblue'
                    : 'white',
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
               {floorReceptionist.LatestMessage}
              </p>
              <div className="img-9">{floorReceptionist.FirstName[0]}</div>

              <p className="TimeandDate"> 7/19/2013</p>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default FloorReceptionists;
