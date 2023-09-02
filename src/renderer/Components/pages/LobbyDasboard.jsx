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
import { FiAlertCircle, FiSearch } from 'react-icons/fi';
import '../styles/LobbyDasboard.css';
import RegisterCustomer from '../items/RegisterCustomer';
import Client from '../items/Client';
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
  useEffect(() => {
    dispatch(getWaitingCustomers());
    dispatch(getSentCustomers());
    dispatch(getScheduledCustomers());
    dispatch(reset());
  }, []);
  useEffect(() => {
    dispatch(getSentCustomers());
    dispatch(getWaitingCustomers());
    dispatch(getScheduledCustomers());
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
    const InstantMessage = {
      email: user.FloorNumber,
      content: `${clientData.FirstName} ${clientData.LastName} wants to come to ${clientData.Department}. Shall I send him?`,
      address: clientData.FloorNumber,
    };
    sendMessage(InstantMessage);
    const composedMessage = {
      content: `${clientData.FirstName} ${clientData.LastName} wants to come to ${clientData.Department}. Shall I send him?`,

      to: clientData.FloorNumber,
    };
    dispatch(updateLatestMessage(composedMessage));
  }
  useEffect(() => {
    if (!user) {
      toHomepage();
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
              .map((client) => (
                <Client
                  key={client.id}
                  client={client}
                  handleDragStart={handleDragStart}
                  handleDragOver={handleDragOver}
                  handleDropOnWaitingClients={handleDropOnWaitingClients}
                />
              ))
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
            ? sentClients.map((client) => (
                <Client
                  key={client.id}
                  client={client}
                  handleDragStart={handleDragStart}
                  handleDragOver={handleDragOver}
                  handleDropOnWaitingClients={handleDropOnWaitingClients}
                />
              ))
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
            ? scheduledClients.map((client) => (
                <Client
                  key={client.id}
                  client={client}
                  handleDragStart={handleDragStart}
                  handleDragOver={handleDragOver}
                  handleDropOnWaitingClients={handleDropOnWaitingClients}
                />
              ))
            : ''}
        </div>
      )}
    </div>
  );
};

export default LobbyDashboard;
