import moment from 'moment';
import '../styles/Conversations.css';
import { getFloorCustomers } from 'renderer/features/customers/customerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Spinner from '../Utilities/Spinner';
import { ws } from 'renderer/webSocket';
const Conversations = ({ floorNumber }) => {
  const FloorNumber = floorNumber;
  const [FloorCustomers, setFloorCustomers] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(false);
  const { message, isErrorGetCusomers, isLoadingGetCustomers } = useSelector(
    (state) => state.customer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFloorCustomers(FloorNumber));
  }, [FloorNumber]);

  useEffect(() => {
    if (message && !isErrorGetCusomers) {
      console.log('this is the message that is setted', message);
      setFloorCustomers(message);
    }
  }, [message]);
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
    console.log('here is the incoming message', incomingMessage);
    if (incomingMessage) {
      dispatch(getFloorCustomers(FloorNumber));
    }
    setIncomingMessage(false);
  }, [incomingMessage]);
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
            <p className="customerName">
              {' '}
              {FloorCustomer.FirstName + ' '} {FloorCustomer.LastName}
            </p>
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
            {FloorCustomer.Accepted ? (
              <p className="ArcustomerContent"> Yes. Let him come</p>
            ) : (
              ''
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
            {FloorCustomer.Arrived ? (
              <p className="ArcustomerContent"> Arrived</p>
            ) : FloorCustomer.Status && FloorCustomer.Status.postpone ? (
              <p className="ArcustomerContent">
                Scheduled to {formatday(FloorCustomer.Status.date)}
              </p>
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

export default Conversations;
