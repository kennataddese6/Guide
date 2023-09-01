import SideBar from '../items/SideBar';
import Navbar from '../items/Navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaEnvelope, FaUsers } from 'react-icons/fa';
import { FiChevronDown, FiSettings, FiMessageSquare } from 'react-icons/fi';
import { IoMdAnalytics, IoIosNotifications } from 'react-icons/io';
import { BiTask } from 'react-icons/bi';
import { MdAssignment } from 'react-icons/md';
import { FiMoreVertical } from 'react-icons/fi';
import { FiAlertCircle, FiSearch } from 'react-icons/fi';
import '../styles/LobbyDasboard.css';
import RegisterCustomer from '../items/RegisterCustomer';
import {
  getCustomers,
  reset,
  updateCustomer,
  getSentCustomers,
  getWaitingCustomers,
  getScheduledCustomers,
} from 'renderer/features/customers/customerSlice';
import Switch from 'react-switch';
import Spinner from '../Utilities/Spinner';
import { updateLatestMessage } from '../../features/auth/authSlice';
import { sendMessage, ws } from 'renderer/webSocket';

const LobbyDashboard = () => {
  const [clients, setClients] = useState([]);
  const [sentClients, setSentClients] = useState([]);
  const [scheduledClients, setScheduledClients] = useState([]);
  const [checked, setChecked] = useState(false);
  const [incomingMessage, setIncomingMessage] = useState(false);

  const {
    isLoading,
    isError,
    isSuccess,
    message,
    isErrorGetCusomers,
    isLoadingGetCustomers,
    SentCustomers,
    ScheduledCustomers,
  } = useSelector((state) => state.customer);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toHomepage = () => {
    navigate('/');
  };
  useEffect(() => {
    if (message && message.length && !isErrorGetCusomers) {
      setClients(message);
    }
    if (SentCustomers) {
      setSentClients(SentCustomers);
    }
    if (ScheduledCustomers) {
      setScheduledClients(ScheduledCustomers);
    }
    // dispatch(reset());  //  Commented out its causing miss infromation
  }, [message, isErrorGetCusomers, SentCustomers, ScheduledCustomers]);
  useEffect(() => {}, [isLoadingGetCustomers, isLoading]);
  useEffect(() => {
    dispatch(getWaitingCustomers());
    dispatch(getSentCustomers());
    dispatch(getScheduledCustomers());
    dispatch(reset());
  }, []);
  useEffect(() => {
    dispatch(getSentCustomers());
    dispatch(getWaitingCustomers());
  }, [isSuccess]);
  function handleChange(checked) {
    setChecked(checked);
  }
  function handleDragStart(event, client) {
    event.dataTransfer.setData('text/plain', JSON.stringify(client));
  }
  function handleDragOver(event) {
    event.preventDefault();
  }
  function handleDrop(event) {
    event.preventDefault();
    const clientData = JSON.parse(event.dataTransfer.getData('text/plain'));
    // Update your application state with clientData
    const composedMessage = {
      content:
        'I have sent ' + clientData.FirstName + ' ' + clientData.LastName,
      to: clientData.FloorNumber,
    };
    const updateData = {
      Sent: true,
      ID: clientData._id,
    };
    const InstantMessage = {
      email: user.FloorNumber,
      content:
        'I have sent ' + clientData.FirstName + ' ' + clientData.LastName,
      address: clientData.FloorNumber,
    };
    sendMessage(InstantMessage);
    dispatch(updateLatestMessage(composedMessage));
    dispatch(updateCustomer(updateData));
  }
  function handleDropOnWaitingClients(event) {
    event.preventDefault();
    const clientData = JSON.parse(event.dataTransfer.getData('text/plain'));
    const updateData = {
      Waiting: true,
      postpone: false,
      ID: clientData._id,
    };
    dispatch(updateCustomer(updateData));
  }
  useEffect(() => {
    if (!user) {
      toHomepage();
    }
  }, [user]);
  const generateColorFromString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let j = 0; j < 3; j++) {
      const value = (hash >> (j * 8)) & 0xff;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  };
  const getColorFromName = (name) => {
    return generateColorFromString(name);
  };
  const getBrightness = (color) => {
    // Convert color to RGB
    const hex = color.replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => {
        return r + r + g + g + b + b;
      }
    );
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const r = parseInt(rgb[1], 16);
    const g = parseInt(rgb[2], 16);
    const b = parseInt(rgb[3], 16);

    // Calculate brightness
    return (r * 299 + g * 587 + b * 114) / 1000;
  };
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
  ws.addEventListener('message', function (event) {
    setIncomingMessage(true);
  });

  useEffect(() => {
    if (incomingMessage) {
      dispatch(getWaitingCustomers());
      dispatch(getScheduledCustomers());
    }
    setIncomingMessage(false);
  }, [incomingMessage]);
  return (
    <div className="dashboard">
      <SideBar index={1} />
      <div className="div-wrapper">
        <RegisterCustomer role="Customer" />
      </div>
      <div className="overlap-2">
        <div className="text-wrapper-13">
          <div style={{ alignSelf: 'start' }}>
            <FiSearch />
          </div>
          <div>Waiting Clients</div>
          <div style={{ textAlign: 'right' }}> </div>
        </div>
        {isLoadingGetCustomers && <Spinner />}
        {isErrorGetCusomers && (
          <h4
            style={{
              color: 'red',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {' '}
            Server Error !
          </h4>
        )}
        {clients
          ? clients
              .filter((client) =>
                client.Status ? client.Status.postpone === false : true
              )
              .map((client) => {
                const fullName = client.FirstName + ' ' + client.LastName;
                const color = getColorFromName(fullName);
                const isLightColor = getBrightness(color) > 180;
                return (
                  <div
                    className="comments-elements"
                    draggable="true"
                    onDragStart={(event) => handleDragStart(event, client)}
                    onDragOver={(event) => handleDragOver(event)}
                    onDrop={(event) => handleDropOnWaitingClients(event)}
                  >
                    <div
                      className="img-2"
                      alt="Avatar woman"
                      style={{
                        backgroundColor: color,
                        color: isLightColor ? 'black' : 'white',
                      }}
                    >
                      {' '}
                      {client.FirstName[0]}
                    </div>
                    <div className="overlap-3">
                      <p>
                        {client.FirstName + ' '} {client.LastName}
                      </p>
                      <p style={{ marginTop: '-10px', fontStyle: 'italic' }}>
                        {client.Department}
                      </p>
                    </div>
                    <FiMoreVertical className="icon-navigation-more" />
                  </div>
                );
              })
          : ''}
      </div>
      <Navbar TotalClients={clients.length} />
      {!checked ? (
        <div
          className="cards-elevation"
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event)}
        >
          <div className="text-wrapper-13">
            <div style={{ alignSelf: 'start' }}>
              <FiSearch />
            </div>
            <div> Sent Clients</div>
            <div style={{ textAlign: 'right' }}>
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
          {sentClients
            ? sentClients.map((client) => {
                const fullName = client.FirstName + ' ' + client.LastName;
                const color = getColorFromName(fullName);
                const isLightColor = getBrightness(color) > 180;
                return (
                  <div
                    className="comments-elements"
                    draggable="true"
                    onDragStart={(event) => handleDragStart(event, client)}
                  >
                    <div
                      className="img-2"
                      alt="Avatar woman"
                      style={{
                        backgroundColor: color,
                        color: isLightColor ? 'black' : 'white',
                      }}
                    >
                      {' '}
                      {client.FirstName[0]}
                    </div>
                    <div className="overlap-3">
                      <p>
                        {client.FirstName + ' '} {client.LastName}
                      </p>
                      <p style={{ marginTop: '-10px', fontStyle: 'italic' }}>
                        {client.Department}
                      </p>
                    </div>
                    <FiMoreVertical className="icon-navigation-more" />
                  </div>
                );
              })
            : ''}
        </div>
      ) : (
        <div
          className="cards-elevation"
          onDragOver={(event) => handleDragOver(event)}
        >
          <div className="text-wrapper-13">
            <div style={{ alignSelf: 'start' }}>
              <FiSearch />
            </div>
            <div> Scheduled Clients</div>
            <div style={{ textAlign: 'right' }}>
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
          {scheduledClients
            ? scheduledClients.map((client) => {
                const fullName = client.FirstName + ' ' + client.LastName;
                const color = getColorFromName(fullName);
                const isLightColor = getBrightness(color) > 180;
                return (
                  <div
                    className="comments-elements"
                    draggable="true"
                    onDragStart={(event) => handleDragStart(event, client)}
                  >
                    <div
                      className="img-2"
                      alt="Avatar woman"
                      style={{
                        backgroundColor: color,
                        color: isLightColor ? 'black' : 'white',
                      }}
                    >
                      {' '}
                      {client.FirstName[0]}
                    </div>
                    <div className="overlap-3">
                      <p>
                        {client.FirstName + ' '} {client.LastName}
                      </p>
                      <p style={{ marginTop: '-10px', fontStyle: 'italic' }}>
                        {client.Department}
                      </p>
                    </div>
                    <FiMoreVertical className="icon-navigation-more" />
                  </div>
                );
              })
            : ''}
        </div>
      )}
    </div>
  );
};

export default LobbyDashboard;
