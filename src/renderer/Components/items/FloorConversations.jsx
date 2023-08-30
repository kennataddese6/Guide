import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFloorCustomers } from 'renderer/features/customers/customerSlice';
import Spinner from '../Utilities/Spinner';
import { updateCustomer } from 'renderer/features/customers/customerSlice';
import { reset } from 'renderer/features/customers/customerSlice';
import { updateLatestMessage } from 'renderer/features/auth/authSlice';
import { sendMessage, ws } from 'renderer/webSocket';
import { DatePicker } from 'react-rainbow-components';
const FloorConversations = ({ floorNumber, reload, setReload }) => {
  const dispatch = useDispatch();
  const FloorNumber = floorNumber;
  const [FloorCustomers, setFloorCustomers] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(false);
  const [postponeClient, setPostPoneClient] = useState(false);
  const [postPoneDate, setPostPoneDate] = useState(false);
  const { isSuccess, message, isErrorGetCusomers, isLoadingGetCustomers } =
    useSelector((state) => state.customer);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getFloorCustomers(FloorNumber));
  }, [FloorNumber]);
  useEffect(() => {
    if (isSuccess) {
      dispatch(getFloorCustomers(FloorNumber));
    }
    dispatch(reset());
  }, [isSuccess]);
  useEffect(() => {
    if (message && !isErrorGetCusomers) {
      console.log('this is the message that is setted', message);
      setFloorCustomers(message);
    }
  }, [message]);

  const customerAccepted = (id, firstName, lastName, floorNumber) => {
    const updateData = {
      Accepted: true,
      ID: id,
    };
    dispatch(updateCustomer(updateData));
    const composedMessage = {
      content: `Yes. Let ${firstName} ${lastName} come`,
      to: floorNumber,
    };
    dispatch(updateLatestMessage(composedMessage));
    const InstantMessage = {
      email: user.FloorNumber,
      content: `Yes. Let ${firstName} ${lastName} come`,
      address: 0,
    };
    sendMessage(InstantMessage);
    setReload(true);
  };

  const customerArrived = (id, firstName, lastName, floorNumber) => {
    const updateData = {
      Arrived: true,
      ID: id,
    };
    dispatch(updateCustomer(updateData));

    const composedMessage = {
      content: `Customer  ${firstName} ${lastName} has Arrived`,
      to: floorNumber,
    };
    const InstantMessage = {
      email: user.FloorNumber,
      content: `Customer  ${firstName} ${lastName} has Arrived`,
      address: 0,
    };
    sendMessage(InstantMessage);
    dispatch(updateLatestMessage(composedMessage));
    setReload(true);
  };
  function formatDate(dateString) {
    const date = moment(dateString);
    const now = moment();
    if (now.diff(date, 'days') >= 1) {
      return date.format('DD-MM-YYYY');
    } else {
      return date.format('HH:mm');
    }
  }
  ws.addEventListener('message', function (event) {
    setIncomingMessage(true);
  });
  useEffect(() => {
    if (incomingMessage) {
      console.log('here is the incoming message', incomingMessage);

      dispatch(getFloorCustomers(FloorNumber));
    }
    setIncomingMessage(false);
  }, [incomingMessage]);
  const handleNotificationClick = () => {
    dispatch(getFloorCustomers(FloorNumber));
  };
  useEffect(() => {
    window.electron.ipcRenderer.on(
      'notification-clicked',
      handleNotificationClick
    );
    return () => {};
  }, []);
  return (
    <>
      {isLoadingGetCustomers && <Spinner />}
      {isErrorGetCusomers && (
        <h4
          style={{
            color: 'red',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Server Error !
        </h4>
      )}
      {FloorCustomers ? (
        FloorCustomers.map((FloorCustomer) => (
          <div className="conversationCard">
            <h3 className="customerName">
              {' '}
              {FloorCustomer.FirstName + ' '} {FloorCustomer.LastName}
            </h3>
            <p className="customerContent">
              Mr {FloorCustomer.FirstName + ' '} {FloorCustomer.LastName + ' '}
              wants to come to {FloorCustomer.Department}. Shall I send him?
            </p>
            {FloorCustomer.Waiting &&
            !FloorCustomer.Accepted &&
            !postponeClient ? (
              <div className="buttonHolder">
                <button
                  className="acceptCusotmer"
                  onClick={() => {
                    customerAccepted(
                      FloorCustomer._id,
                      FloorCustomer.FirstName,
                      FloorCustomer.LastName,
                      FloorCustomer.FloorNumber
                    );
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    setPostPoneClient(true);
                  }}
                  className="postponeCustomer"
                >
                  Postpone
                </button>
              </div>
            ) : FloorCustomer.Waiting &&
              !FloorCustomer.Accepted &&
              postponeClient ? (
              <div className="buttonHolder">
                <DatePicker
                  id="datePicker-1"
                  formatStyle="small"
                  value={postPoneDate}
                  onChange={(date) => {
                    setPostPoneDate(date);
                  }}
                  style={{ maxWidth: 120 }}
                />
                <button className="acceptCusotmer"> Okay </button>
                <button
                  onClick={() => {
                    setPostPoneClient(false);
                  }}
                  className="postponeCustomer"
                >
                  {' '}
                  Cancel{' '}
                </button>
              </div>
            ) : (
              <p className="ArcustomerContent">Accepted</p>
            )}
            {FloorCustomer.Sent ? (
              <p className="customerContent">
                {' '}
                I have sent {FloorCustomer.FirstName + ' '}{' '}
                {FloorCustomer.LastName}
              </p>
            ) : (
              ''
            )}
            {FloorCustomer.Sent && !FloorCustomer.Arrived ? (
              <p
                className="rcustomerContent"
                onClick={() => {
                  customerArrived(
                    FloorCustomer._id,
                    FloorCustomer.FirstName,
                    FloorCustomer.LastName,
                    FloorCustomer.FloorNumber
                  );
                }}
              >
                He has arrived
              </p>
            ) : FloorCustomer.Sent && FloorCustomer.Arrived ? (
              <p className="ArcustomerContent"> Arrived</p>
            ) : (
              ''
            )}
            <p className="rcustomerTime">
              {formatDate(FloorCustomer.updatedAt)}
            </p>
          </div>
        ))
      ) : (
        <>
          <div>
            <h1>Sorry Nothing to show</h1>
          </div>
        </>
      )}
    </>
  );
};
export default FloorConversations;
