import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../auth/authSlice';
const useRefresh = () => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (refresh) {
      const userData = {
        email: user.Email,
        password: user.Password,
      };
      dispatch(login(userData));
    }
    setRefresh(false);
  }, [refresh]);
  return { refresh, setRefresh };
};

export default useRefresh;
