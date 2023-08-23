import { logout } from 'renderer/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloorSideBar from '../items/FloorSidebar';
const FloorMessages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);
  return (
    <>
      <FloorSideBar index={2} />{' '}
      <div>
        <h1> Hello this is Floor Messages</h1>
      </div>
    </>
  );
};
export default FloorMessages;
