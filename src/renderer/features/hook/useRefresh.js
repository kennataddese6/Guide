import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFloorCustomers } from '../customers/customerSlice';
const useRefresh = () => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (refresh) {
      dispatch(getFloorCustomers(user.FloorNumber));
    }
    setRefresh(false);
  }, [refresh]);
  return { refresh, setRefresh };
};

export default useRefresh;
