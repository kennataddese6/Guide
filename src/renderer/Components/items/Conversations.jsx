import '../styles/Conversations.css';
import { getFloorCustomers } from 'renderer/features/customers/customerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
const Conversations = ({ floorNumber }) => {
  const FloorNumber = floorNumber;
  const [FloorCustomers, setFloorCustomers] = useState([]);
  const { isSuccess, message, isErrorGetCusomers, isLoadingGetCustomers } =
    useSelector((state) => state.customer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFloorCustomers(FloorNumber));
  }, [FloorNumber]);

  useEffect(() => {
    if (message && message.length && !isErrorGetCusomers) {
      console.log('this is the message that is setted', message);
      setFloorCustomers(message);
    }
  }, [message]);
  return (
    <>
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
            <p className="rcustomerContent"> Yes. Let him come</p>
            <p className="customerContent">
              {' '}
              I have sent {FloorCustomer.FirstName + ' '}{' '}
              {FloorCustomer.LastName}
            </p>
            <p className="rcustomerContent"> He has arrived</p>
            <p className="customerContent"> Remarks:</p>
            <p className="rcustomerTime"> 07/19/2023</p>
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default Conversations;
