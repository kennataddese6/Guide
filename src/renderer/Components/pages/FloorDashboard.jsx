import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloorSideBar from '../items/FloorSidebar';
import { getFloorCustomers } from 'renderer/features/customers/customerSlice';
import '../styles/floorDashboard.css';
import Switch from 'react-switch';
import { FiSearch } from 'react-icons/fi';

const FloorDashboard = ({ online }) => {
  const navigate = useNavigate();
  const dipatch = useDispatch();
  const [clients, setClients] = useState([]);
  const [checked, setChecked] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.customer);

  function handleChange(checked) {
    setChecked(checked);
  }

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
      {checked ? (
        <div className="firstFrame">
          <div className="frameHeader">
            <div className="searchContainer">
              <FiSearch />
            </div>
            <h3 className="headerText"> Booked Clients</h3>
            <div className="toggleBar">
              {' '}
              <Switch
                onChange={handleChange}
                checked={checked}
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
                onColor="#c737a1"
                offColor="#FFD700"
              />
            </div>
          </div>
          {clients
            ? clients
                .filter((client) =>
                  client.Status ? client.Status.postpone === true : false
                )
                .map((client) => (
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
                ))
            : []}
        </div>
      ) : (
        <div className="firstFrame">
          <div className="frameHeader">
            <div className="searchContainer">
              <FiSearch />
            </div>
            <h3 className="headerText"> Waiting Clients</h3>
            <div className="toggleBar">
              {' '}
              <Switch
                onChange={handleChange}
                checked={checked}
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
                onColor="#c737a1"
                offColor="#FFD700"
              />
            </div>
          </div>
          {clients
            ? clients
                .filter((client) =>
                  client.Status
                    ? client.Status.postpone === false &&
                      client.Booking === false
                    : true
                )
                .map((client) => (
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
                ))
            : []}
        </div>
      )}
      <div className="secondFrame">
        <div className="frameHeader">
          <h3 className="headerText"> Incoming Clients</h3>
        </div>
        {clients
          ? clients
              .filter((client) =>
                client
                  ? client.Sent === true && client.Arrived === false
                  : false
              )
              .map((client) => (
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
              ))
          : []}
      </div>
    </>
  );
};
export default FloorDashboard;
