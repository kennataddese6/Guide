import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCustomers } from 'renderer/features/customers/customerSlice';
const Report = () => {
  const dipatch = useDispatch();
  const [customers, setCustomers] = useState([]);
  const { isSuccess, message } = useSelector((state) => state.customer);

  useEffect(() => {
    dipatch(getCustomers());
  }, []);
  useEffect(() => {
    if (isSuccess) {
      setCustomers(message);
      console.log(customers);
    }
  }, [isSuccess]);
  return (
    <div>
      <p>Hello this is Report page</p>
    </div>
  );
};
export default Report;
