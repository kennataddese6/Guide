import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloorSideBar from '../items/FloorSidebar';
import { getFloorCustomers } from 'renderer/features/customers/customerSlice';
import '../styles/floorDashboard.css';

const FloorDashboard = ({ online }) => {
  const navigate = useNavigate();
  const dipatch = useDispatch();
  const [clients, setClients] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.customer);

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
    dipatch(getFloorCustomers(user ? user.FloorNumber : ''));
  }, []);
  useEffect(() => {
    setClients(message);
  }, [message]);
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
        {clients.map((client) => (
          <div className="clientsList">
            <div
              className="clientCircle"
              alt="Avatar woman"
              style={{
                backgroundColor: 'grey',
                color: 'black',
              }}
            >
              {' '}
              {client.FirstName[0].toUpperCase()}
            </div>
            <div className="clientInfoContainer">
              <p>
                {' '}
                {client.FirstName} {client.LastName}
              </p>
              <p style={{ marginTop: '-10px', fontStyle: 'italic' }}>
                {' '}
                {client.Department}
              </p>
            </div>
          </div>
        ))}
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
