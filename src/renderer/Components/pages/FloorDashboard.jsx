import { logout } from 'renderer/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloorSideBar from '../items/FloorSidebar';
const FloorDashboard = ({online}) => {
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
  const handleNotificationClick = () => {
    if (user && user.Roles === 1000) {
      navigate('/Messages');
    }
    if (user && user.Roles === 4800) {
      navigate('/FloorMessages');
    }
  };
  useEffect(() => {
    window.electron.ipcRenderer.on(
      'notification-clicked',
      handleNotificationClick
    );
    return () => {};
  }, []);
  return (
    <>
      <FloorSideBar index={1} online = {online} />
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
