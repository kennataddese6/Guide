import moment from 'moment';
import '../styles/FloorRecetionists.css';
import { useEffect, useState } from 'react';
import { getFloorReceptionists } from 'renderer/features/auth/authSlice';
import { getCustomers } from 'renderer/features/customers/customerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from 'renderer/features/auth/authSlice';
import { ws } from 'renderer/webSocket';

const FloorReceptionists = ({ selectedFloor, setSelectedFloor }) => {
  const dispatch = useDispatch();
  const [floorReceptionists, setFloorReceptionists] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(false);
  const [client, setClient] = useState([]);

  const {
    isSuccessgetFloorReceptionists,
    message: authMessage,
    user,
  } = useSelector((state) => state.auth);
  const { isSuccess, message: customerMessage } = useSelector(
    (state) => state.customer
  );

  const passFloorNumber = (number) => {
    setSelectedFloor(number);
  };
  useEffect(() => {
    dispatch(getFloorReceptionists());
    dispatch(getCustomers());
  }, []);
  useEffect(() => {
    if (isSuccessgetFloorReceptionists) {
      setFloorReceptionists(authMessage);
    }
    dispatch(reset());
  }, [isSuccessgetFloorReceptionists]);
  useEffect(() => {
    if (isSuccess) {
      console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii', customerMessage);
      console.log(
        'here is the last client',
        customerMessage
          .filter((customers) => customers.FloorNumber === selectedFloor)
          .filter((customer) => customer.RegisteredBy === user.Email)[0]
      );
      setClient(customerMessage);
    }
  }, [isSuccess]);

  /*   function trimMessage(message) {
    return message.length > 32 ? message.substring(0, 32) + '...' : message;
  } */
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
                {client
                  .filter(
                    (customer) =>
                      customer.FloorNumber === floorReceptionist.FloorNumber
                  )
                  .filter((customer) => customer.RegisteredBy === user.Email)[0]
                  ?.Booking
                  ? `Mr ${client[0]?.FirstName} would be visiting us`
                  : client
                      .filter(
                        (customer) =>
                          customer.FloorNumber === floorReceptionist.FloorNumber
                      )
                      .filter(
                        (customer) => customer.RegisteredBy === user.Email
                      )[0]?.Sent
                  ? `I have sent ${client[0]?.FirstName}`
                  : client
                      .filter(
                        (customer) =>
                          customer.FloorNumber === floorReceptionist.FloorNumber
                      )
                      .filter(
                        (customer) => customer.RegisteredBy === user.Email
                      )[0]?.Accepted
                  ? `Yes, let ${client[0]?.FirstName} come`
                  : client
                      .filter(
                        (customer) =>
                          customer.FloorNumber === floorReceptionist.FloorNumber
                      )
                      .filter(
                        (customer) => customer.RegisteredBy === user.Email
                      )[0]?.Waiting
                  ? `${client[0]?.FirstName} wants to come`
                  : `Sorry`}{' '}
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
