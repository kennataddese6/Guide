import moment from 'moment';
import '../styles/FloorRecetionists.css';
import { useEffect, useState } from 'react';
import { getFloorReceptionists } from 'renderer/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from 'renderer/features/auth/authSlice';
import { ws } from 'renderer/webSocket';

const FloorReceptionists = ({ selectedFloor, setSelectedFloor }) => {
  const dispatch = useDispatch();
  const [floorReceptionists, setFloorReceptionists] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(false);

  const { isSuccessgetFloorReceptionists, message } = useSelector(
    (state) => state.auth
  );
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

  function trimMessage(message) {
    return message.length > 32 ? message.substring(0, 32) + '...' : message;
  }
  function formatDate(dateString) {
    const date = moment(dateString);
    const now = moment();
    if (now.diff(date, 'days') >= 1) {
      return date.format('DD-MM-YYYY');
    } else {
      return date.format('HH:mm');
    }
  }
  ws.addEventListener('message', function () {
    setIncomingMessage(true);
  });
  useEffect(() => {
    if (incomingMessage) {
      console.log('here is the incoming message', incomingMessage);

      dispatch(getFloorReceptionists());
    }
    setIncomingMessage(false);
  }, [incomingMessage]);
  return (
    <>
      {floorReceptionists ? (
        floorReceptionists.map((floorReceptionist) => {
          !selectedFloor && setSelectedFloor(floorReceptionists[0].FloorNumber);
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
              <p className="ReceptionistName">
                {floorReceptionist.FirstName + ' '}
                {floorReceptionist.LastName} ({floorReceptionist.FloorNumber})
                Floor
              </p>

              <p className="messageContent">
                {' '}
                {floorReceptionist.LatestMessage
                  ? trimMessage(floorReceptionist.LatestMessage)
                  : 'Sorry. Nothing to show'}
              </p>
              <div className="img-9">{floorReceptionist.FirstName[0]}</div>

              <p className="TimeandDate">
                {' '}
                {formatDate(floorReceptionist.updatedAt)}
              </p>
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
