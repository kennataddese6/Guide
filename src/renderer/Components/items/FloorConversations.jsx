import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFloorCustomers } from 'renderer/features/customers/customerSlice';
import Spinner from '../Utilities/Spinner';
import { updateCustomer } from 'renderer/features/customers/customerSlice';
import { reset } from 'renderer/features/customers/customerSlice';
import { updateLatestMessage } from 'renderer/features/auth/authSlice';
import { sendMessage, ws } from 'renderer/webSocket';
import { DateTimePicker } from 'react-rainbow-components';
import { FaCheckCircle } from 'react-icons/fa';
import { FaHandHoldingHeart } from 'react-icons/fa';

const FloorConversations = ({ floorNumber, setReload }) => {
  const dispatch = useDispatch();
  const FloorNumber = floorNumber;
  const [FloorCustomers, setFloorCustomers] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(false);
  const [postponeClient, setPostPoneClient] = useState(false);
  const [clickedCardId, setClickedCardId] = useState(null);
  const [postPoneDate, setPostPoneDate] = useState(new Date());
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

  const customerAccepted = (
    id,
    firstName,
    lastName,
    floorNumber,
    RegisteredBy
  ) => {
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
      email: String(user.FloorNumber),
      content: `Yes. Let ${firstName} ${lastName} come`,
      address: RegisteredBy,
    };
    sendMessage(InstantMessage);
    setReload(true);
  };

  const customerArrived = (
    id,
    firstName,
    lastName,
    floorNumber,
    RegisteredBy
  ) => {
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
      email: String(user.FloorNumber),
      content: `Customer  ${firstName} ${lastName} has Arrived`,
      address: RegisteredBy,
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
  function formatday(date) {
    const inputDate = new Date(date);
    const currentDate = new Date();
    const tomorrow = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    const oneWeekFromNow = new Date(
      currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
    );

    if (inputDate.toDateString() === currentDate.toDateString()) {
      return 'Today';
    } else if (inputDate > currentDate && inputDate < oneWeekFromNow) {
      if (inputDate.getDate() === tomorrow.getDate()) {
        return 'Tomorrow';
      } else {
        const daysOfWeek = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];
        return daysOfWeek[inputDate.getDay()];
      }
    } else {
      const day = inputDate.getDate().toString().padStart(2, '0');
      const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
      const year = inputDate.getFullYear();
      return `${day}-${month}-${year}`;
    }
  }

  ws.addEventListener('message', function () {
    setIncomingMessage(true);
  });
  useEffect(() => {
    if (incomingMessage) {
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
  const ScheduleClient = (
    id,
    firstName,
    lastName,
    floorNumber,
    RegisteredBy
  ) => {
    const updateData = {
      ID: id,
      Postpone: true,
      date: postPoneDate,
    };
    console.log('here is hte user data', updateData);
    dispatch(updateCustomer(updateData));
    const composedMessage = {
      content: ` ${firstName} ${lastName} is Scheduled`,
      to: floorNumber,
    };
    const InstantMessage = {
      email: String(user.FloorNumber),
      content: ` ${firstName} ${lastName} is Scheduled`,
      address: RegisteredBy,
    };
    sendMessage(InstantMessage);
    dispatch(updateLatestMessage(composedMessage));
    setPostPoneClient(false);
    setPostPoneDate(new Date());
    setReload(true);
  };
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
              {FloorCustomer.corporate ? (
                <FaCheckCircle color="green" size={12} />
              ) : (
                ''
              )}
            </h3>
            {FloorCustomer.Booking ? (
              <p className="customerContent">
                {' '}
                Mr {FloorCustomer.FirstName + ' '}{' '}
                {FloorCustomer.LastName + ' '} will be visiting{' '}
                {FloorCustomer.Department}. Please Let him in when here arrives.
              </p>
            ) : (
              <p className="customerContent">
                Mr {FloorCustomer.FirstName + ' '}{' '}
                {FloorCustomer.LastName + ' '}
                wants to come to {FloorCustomer.Department}. Shall I send him?
              </p>
            )}

            {FloorCustomer.Waiting &&
            !FloorCustomer.Accepted &&
            postponeClient &&
            FloorCustomer._id === clickedCardId ? (
              <div className="buttonHolder">
                <DateTimePicker
                  id="dateTimePicker-1"
                  formatStyle="small"
                  value={postPoneDate}
                  onChange={(date) => {
                    setPostPoneDate(date);
                  }}
                  style={{ maxWidth: 120 }}
                />
                <button
                  className="acceptCusotmer"
                  onClick={() => {
                    ScheduleClient(
                      FloorCustomer._id,
                      FloorCustomer.FirstName,
                      FloorCustomer.LastName,
                      FloorCustomer.FloorNumber,
                      FloorCustomer.RegisteredBy
                    );
                  }}
                >
                  {' '}
                  Okay{' '}
                </button>
                <button
                  onClick={() => {
                    setPostPoneClient(false);
                    setClickedCardId(null);
                  }}
                  className="postponeCustomer"
                >
                  {' '}
                  Cancel{' '}
                </button>
              </div>
            ) : FloorCustomer.Waiting &&
              !FloorCustomer.Accepted &&
              !FloorCustomer.Booking ? (
              <div className="buttonHolder">
                <button
                  className="acceptCusotmer"
                  onClick={() => {
                    customerAccepted(
                      FloorCustomer._id,
                      FloorCustomer.FirstName,
                      FloorCustomer.LastName,
                      FloorCustomer.FloorNumber,
                      FloorCustomer.RegisteredBy
                    );
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    setPostPoneClient(true);
                    setClickedCardId(FloorCustomer._id);
                  }}
                  className="postponeCustomer"
                >
                  Postpone
                </button>
              </div>
            ) : FloorCustomer.Accepted ? (
              <p className="ArcustomerContent">Accepted</p>
            ) : FloorCustomer.Status.postpone ? (
              <p className="ArcustomerContent">
                Scheduled to {formatday(FloorCustomer.Status.date)} on{' '}
                {new Date(FloorCustomer.Status.date)
                  .getHours()
                  .toString()
                  .padStart(2, '0')}
                :
                {new Date(FloorCustomer.Status.date)
                  .getMinutes()
                  .toString()
                  .padStart(2, '0')}
              </p>
            ) : null}
            {FloorCustomer.Sent ? (
              <p className="customerContent">
                {' '}
                I have sent {FloorCustomer.FirstName + ' '}{' '}
                {FloorCustomer.LastName} on Elevator{' '}
                {FloorCustomer.ElevatorNumber}
                {FloorCustomer.special ? (
                  <FaHandHoldingHeart size={20} color="green" />
                ) : (
                  ''
                )}
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
                    FloorCustomer.FloorNumber,
                    FloorCustomer.RegisteredBy
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
