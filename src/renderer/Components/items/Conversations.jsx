import moment from 'moment';
import '../styles/Conversations.css';
import { getFloorCustomers } from 'renderer/features/customers/customerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Spinner from '../Utilities/Spinner';
import { sendMessage, ws } from 'renderer/webSocket';
const Conversations = ({ floorNumber }) => {
  const FloorNumber = floorNumber;
  const [FloorCustomers, setFloorCustomers] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(false)
  const { isSuccess, message, isErrorGetCusomers, isLoadingGetCustomers } =
    useSelector((state) => state.customer);

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
   ws.addEventListener('message', function (event) {
    setIncomingMessage(true)
  });

  useEffect(()=>{
    console.log('here is the incoming message',incomingMessage)
    if(incomingMessage){
      dispatch(getFloorCustomers(FloorNumber));
    }
    setIncomingMessage(false)
  },[incomingMessage])
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
            ) : (
              ''
            )}
            {/*             <p className="customerContent">
              {' '}
              I have sent {FloorCustomer.FirstName + ' '}{' '}
              {FloorCustomer.LastName}
            </p>
            <p className="rcustomerContent"> He has arrived</p>
            <p className="customerContent"> Remarks:</p> */}
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
