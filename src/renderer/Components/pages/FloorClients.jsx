import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FloorSideBar from '../items/FloorSidebar';
import { getFloorCustomers } from 'renderer/features/customers/customerSlice';
const FloorClients = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.customer);
  const { user } = useSelector((state) => state.auth);

  const [floorCustomers, setFloorCustomers] = useState('');
  useEffect(() => {
    dispatch(getFloorCustomers(user ? user.FloorNumber : ''));
  }, []);
  useEffect(() => {
    setFloorCustomers(message);
    console.log(floorCustomers);
  }, [message]);
  return (
    <>
      <FloorSideBar index={4} />
      <h1> This is Floor Clients Page</h1>
    </>
  );
};
export default FloorClients;
