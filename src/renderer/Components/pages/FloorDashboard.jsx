import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloorSideBar from '../items/FloorSidebar';
import '../styles/floorDashboard.css';
const FloorDashboard = ({ online }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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
      <FloorSideBar index={1} online={online} />
      <div className="firstFrame">
        <div className="frameHeader">
          <h3 className="headerText"> Waiting Clients</h3>
        </div>
        <div className="clientsList"></div>
      </div>
      <div className="secondFrame">
        <div className="frameHeader">
          <h3 className="headerText"> Incoming Clients</h3>
        </div>
      </div>
    </>
  );
};
export default FloorDashboard;
