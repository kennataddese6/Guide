import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'renderer/features/auth/authSlice';
import { useEffect } from 'react';
import { reset } from 'renderer/features/auth/authSlice';
const Users = () => {
  const dispatch = useDispatch();
  const { isSuccessgetFloorReceptionists, isError, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  useEffect(() => {
    if (isSuccessgetFloorReceptionists) {
      console.log('There are some users', message);
    }
    if (isError) {
      console.log('sorry something went wrong');
    }
    dispatch(reset());
  }, [isSuccessgetFloorReceptionists, isError]);
  return (
    <div>
      <p>This are the Users</p>
    </div>
  );
};
export default Users;
