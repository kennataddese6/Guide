import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFloorCustomers } from 'renderer/features/customers/customerSlice';
import Spinner from '../Utilities/Spinner';
import { updateCustomer } from 'renderer/features/customers/customerSlice';
import { reset } from 'renderer/features/customers/customerSlice';
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
  const customerAccepted = (id) => {
    const updateData = {
      Accepted: true,
      ID: id,
    };
    dispatch(updateCustomer(updateData));
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
            </h3>
            <p className="customerContent">
              Mr {FloorCustomer.FirstName + ' '} {FloorCustomer.LastName + ' '}
              wants to come to {FloorCustomer.Department}. Shall I send him?
            </p>
            {FloorCustomer.Waiting && !FloorCustomer.Accepted ? (
              <>
                <p
                  className="rcustomerContent"
                  onClick={() => {
                    customerAccepted(FloorCustomer._id);
                  }}
                >
                  Yes. Let him come
                </p>
              </>
            ) : (
              <p className="ArcustomerContent">Accepted</p>
            )}

            {/*             <p className="customerContent">
              {' '}
              I have sent {FloorCustomer.FirstName + ' '}{' '}
              {FloorCustomer.LastName}
            </p>
            <p className="rcustomerContent"> He has arrived</p>
            <p className="customerContent"> Remarks:</p> */}
            <p className="rcustomerTime"> 07/19/2023</p>
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
