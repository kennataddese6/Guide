import moment from 'moment';
import '../styles/FloorRecetionists.css';
import { useEffect, useState } from 'react';
import { getFloorReceptionists } from 'renderer/features/auth/authSlice';
import { getCustomers } from 'renderer/features/customers/customerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from 'renderer/features/auth/authSlice';
import { reset as resetCustomer } from 'renderer/features/customers/customerSlice';
import { ws } from 'renderer/webSocket';

const FloorReceptionists = ({
  selectedFloor,
  setSelectedFloor,
  setPhoneNumber,
  PhoneNumber,
}) => {
  const dispatch = useDispatch();
  const [floorReceptionists, setFloorReceptionists] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(false);
  const [client, setClient] = useState([]);
  const [systemUser, setSystemUser] = useState('');

  const {
    isSuccessgetFloorReceptionists,
    message: authMessage,
    user,
  } = useSelector((state) => state.auth);
  const { isSuccess, message: customerMessage } = useSelector(
    (state) => state.customer
  );

  const passFloorNumber = (number, phoneNumber) => {
    setSelectedFloor(number);
    setPhoneNumber(phoneNumber);
  };
  useEffect(() => {
    dispatch(getFloorReceptionists());
    dispatch(getCustomers());
    setSystemUser(user ? user : '');
  }, []);
  useEffect(() => {
    if (isSuccessgetFloorReceptionists) {
      setFloorReceptionists(authMessage);
    }
    dispatch(reset());
  }, [isSuccessgetFloorReceptionists]);
  useEffect(() => {
    if (isSuccess) {
      setClient(customerMessage);
    }
    dispatch(resetCustomer());
  }, [isSuccess]);

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
      console.log(
        'I am going to dispatch get floor recpetionist',
        incomingMessage
      );

      dispatch(getFloorReceptionists());
      dispatch(getCustomers());
    }
    setIncomingMessage(false);
  }, [incomingMessage]);
  return (
    <>
      {floorReceptionists ? (
        floorReceptionists.map((floorReceptionist) => {
          !selectedFloor && setSelectedFloor(floorReceptionists[0].FloorNumber);
          !PhoneNumber && setPhoneNumber(floorReceptionists[0].PhoneNumber);
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
                passFloorNumber(
                  floorReceptionist.FloorNumber,
                  floorReceptionist.PhoneNumber
                );
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
                  .filter(
                    (customer) => customer.RegisteredBy === systemUser.Email
                  )[0]?.Booking
                  ? `${trimMessage(
                      ` ${
                        client.find(
                          (customer) =>
                            customer.FloorNumber ===
                              floorReceptionist.FloorNumber &&
                            customer.RegisteredBy === systemUser.Email
                        )?.FirstName
                      } would be visiting us`
                    )}`
                  : client
                      .filter(
                        (customer) =>
                          customer.FloorNumber === floorReceptionist.FloorNumber
                      )
                      .filter(
                        (customer) => customer.RegisteredBy === systemUser.Email
                      )[0]?.Status.postpone
                  ? `${trimMessage(
                      ` ${
                        client.find(
                          (customer) =>
                            customer.FloorNumber ===
                              floorReceptionist.FloorNumber &&
                            customer.RegisteredBy === systemUser.Email
                        )?.FirstName
                      } ${
                        client.find(
                          (customer) =>
                            customer.FloorNumber ===
                              floorReceptionist.FloorNumber &&
                            customer.RegisteredBy === systemUser.Email
                        )?.LastName
                      } has been Scheduled`
                    )}`
                  : client
                      .filter(
                        (customer) =>
                          customer.FloorNumber === floorReceptionist.FloorNumber
                      )
                      .filter(
                        (customer) => customer.RegisteredBy === systemUser.Email
                      )[0]?.Arrived
                  ? `${trimMessage(
                      ` ${
                        client.find(
                          (customer) =>
                            customer.FloorNumber ===
                              floorReceptionist.FloorNumber &&
                            customer.RegisteredBy === systemUser.Email
                        )?.FirstName
                      } ${
                        client.find(
                          (customer) =>
                            customer.FloorNumber ===
                              floorReceptionist.FloorNumber &&
                            customer.RegisteredBy === systemUser.Email
                        )?.LastName
                      } has arrived`
                    )}`
                  : client
                      .filter(
                        (customer) =>
                          customer.FloorNumber === floorReceptionist.FloorNumber
                      )
                      .filter(
                        (customer) => customer.RegisteredBy === systemUser.Email
                      )[0]?.Sent
                  ? `${trimMessage(
                      `I have sent ${
                        client.find(
                          (customer) =>
                            customer.FloorNumber ===
                              floorReceptionist.FloorNumber &&
                            customer.RegisteredBy === systemUser.Email
                        )?.FirstName
                      } ${
                        client.find(
                          (customer) =>
                            customer.FloorNumber ===
                              floorReceptionist.FloorNumber &&
                            customer.RegisteredBy === systemUser.Email
                        )?.LastName
                      } on Elevator
                      `
                    )}`
                  : client
                      .filter(
                        (customer) =>
                          customer.FloorNumber === floorReceptionist.FloorNumber
                      )
                      .filter(
                        (customer) => customer.RegisteredBy === systemUser.Email
                      )[0]?.Accepted
                  ? `${trimMessage(
                      `Yes, let ${
                        client.find(
                          (customer) =>
                            customer.FloorNumber ===
                              floorReceptionist.FloorNumber &&
                            customer.RegisteredBy === systemUser.Email
                        )?.FirstName
                      } ${
                        client.find(
                          (customer) =>
                            customer.FloorNumber ===
                              floorReceptionist.FloorNumber &&
                            customer.RegisteredBy === systemUser.Email
                        )?.LastName
                      } come`
                    )}`
                  : client
                      .filter(
                        (customer) =>
                          customer.FloorNumber === floorReceptionist.FloorNumber
                      )
                      .filter(
                        (customer) => customer.RegisteredBy === systemUser.Email
                      )[0]?.Waiting
                  ? `${trimMessage(
                      `${
                        client.find(
                          (customer) =>
                            customer.FloorNumber ===
                              floorReceptionist.FloorNumber &&
                            customer.RegisteredBy === systemUser.Email
                        )?.FirstName
                      } ${
                        client.find(
                          (customer) =>
                            customer.FloorNumber ===
                              floorReceptionist.FloorNumber &&
                            customer.RegisteredBy === systemUser.Email
                        )?.LastName
                      } wants to come to ${
                        client.find(
                          (customer) =>
                            customer.FloorNumber ===
                              floorReceptionist.FloorNumber &&
                            customer.RegisteredBy === systemUser.Email
                        )?.Department
                      }`
                    )}`
                  : `Sorry, Nothing to show.`}{' '}
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
