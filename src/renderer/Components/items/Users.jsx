import { useDispatch } from 'react-redux';
import { getUsers } from 'renderer/features/auth/authSlice';
import { useEffect } from 'react';
const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div>
      <p>This are the Users</p>
    </div>
  );
};
export default Users;
