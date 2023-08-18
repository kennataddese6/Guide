import '../styles/Conversations.css';
import { getFloorCustomers } from 'renderer/features/customers/customerSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
const Conversations = ({ floorNumber }) => {
  const FloorNumber = floorNumber;
  console.log('this is the floor number', FloorNumber);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('This is at load time');
    dispatch(getFloorCustomers(FloorNumber));
    console.log('I am dispatched');
  }, []);
  return (
    <>
      <div className="conversationCard">
        <h3 className="customerName"> Kenna Taddese {FloorNumber}</h3>
        <p className="customerContent">
          Mr Kenna Taddese wants to come to Finance for Credit calculation.
          Shall I send him ?
        </p>
        <p className="rcustomerContent"> Yes. Let him come</p>
        <p className="customerContent"> I have sent Kenna Taddese</p>
        <p className="rcustomerContent"> He has arrived</p>
        <p className="customerContent"> Remarks:</p>
        <p className="rcustomerTime"> 07/19/2023</p>
      </div>
    </>
  );
};

export default Conversations;
