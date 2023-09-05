import SideBar from '../items/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from 'renderer/features/customers/customerSlice';
import { useEffect, useState } from 'react';
const Clients = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.customer);
  const [allClients, setAllClients] = useState([]);
  useEffect(() => {
    dispatch(getCustomers());
  }, []);
  useEffect(() => {
    setAllClients(message);
    console.log(allClients);
  }, [message]);
  return (
    <>
      {' '}
      <SideBar index={4} />
      <h1>Hello This is Client page</h1>
    </>
  );
};
export default Clients;
