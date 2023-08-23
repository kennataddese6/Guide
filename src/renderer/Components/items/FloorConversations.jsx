import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFloorCustomers } from 'renderer/features/customers/customerSlice';

const FloorConversations = ({ floorNumber }) => {
  const dispatch = useDispatch();
  const FloorNumber = floorNumber;
  const [FloorCustomers, setFloorCustomers] = useState([]);
  const { isSuccess, message, isErrorGetCusomers, isLoadingGetCustomers } =
    useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getFloorCustomers(FloorNumber));
  }, [FloorNumber]);
  useEffect(() => {
    if (message && !isErrorGetCusomers) {
      console.log('this is the message that is setted', message);
      setFloorCustomers(message);
    }
  }, [message]);
  return (
    <div className="conversationCard">
      <h3 className="customerName">
        {' '}
        {/* {FloorCustomer.FirstName + ' '} {FloorCustomer.LastName}
         */}{' '}
      </h3>
      <p className="customerContent">
        {/*   Mr {FloorCustomer.FirstName + ' '} {FloorCustomer.LastName + ' '}
        wants to come to {FloorCustomer.Department}. Shall I send him? */}
      </p>
      <p className="rcustomerContent"> Yes. Let him come</p>
      <p className="customerContent">
        {' '}
        I have sent
        {/*  {FloorCustomer.FirstName + ' '} {FloorCustomer.LastName} */}
      </p>
      <p className="rcustomerContent"> He has arrived</p>
      <p className="customerContent"> Remarks:</p>
      <p className="rcustomerTime"> 07/19/2023</p>
    </div>
  );
};
export default FloorConversations;
