import { logout } from 'renderer/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloorSideBar from '../items/FloorSidebar';
const FloorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const tologout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);
  return (
    <>
      <FloorSideBar />
      <div
        onClick={() => {
          tologout();
        }}
      >
        <h1> This is Floor Receptionist Dashobard</h1>
      </div>
    </>
  );
};
export default FloorDashboard;
