import SideBar from '../items/SideBar';
import Navbar from '../items/Navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
import '../styles/LobbyDasboard.css';
import RegisterCustomer from '../items/RegisterCustomer';
import Client from '../items/Client';
import UpdateGuide from '../items/UpdateGuide';
import {
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

const LobbyDashboard = ({ online, updateAvailable, allClients }) => {
  const [clients, setClients] = useState([]);
  const [sentClients, setSentClients] = useState([]);
  const [scheduledClients, setScheduledClients] = useState([]);
  const [checked, setChecked] = useState(false);
  const [toggleBookedClients, setToggleBookedClients] = useState(false);
  const [incomingMessage, setIncomingMessage] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  const {
    isSuccess,
    message,
    isErrorGetCusomers,
    isLoadingGetCustomers,
    SentCustomers,
    ScheduledCustomers,
  } = useSelector((state) => state.customer);
  const { user } = useSelector((state) => state.auth);
  const [UserEmail] = useState(user ? user.Email : '');
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

  function hanldeToggle(checked) {
    setToggleBookedClients(checked);
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
      content: `${clientData.FirstName} ${
        clientData.LastName
      } wants to come to ${clientData.Department}. Shall I send ${
        clientData.Gender === 'male' ? 'him' : 'her'
      }?`,
      address: clientData.FloorNumber,
    };
    sendMessage(InstantMessage);
    const composedMessage = {
      content: `${clientData.FirstName} ${
        clientData.LastName
      } wants to come to ${clientData.Department}. Shall I send ${
        clientData.Gender === 'male' ? 'him' : 'her'
      }?`,

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

  ws.addEventListener('message', function () {
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
      {showUpdatePopup && (
        <UpdateGuide setShowUpdatePopup={setShowUpdatePopup} />
      )}

      <Navbar TotalClients={allClients} SentClients={SentCustomers.length} />
      <SideBar
        index={1}
        online={online}
        updateAvailable={updateAvailable}
        setShowUpdatePopup={setShowUpdatePopup}
      />
      <div className="div-wrapper">
        <RegisterCustomer role="Customer" />
      </div>
      {!toggleBookedClients ? (
        <div
          className="overlap-2"
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDropOnWaitingClients(event)}
        >
          <div className="text-wrapper-13">
            <div style={{ alignSelf: 'center' }}>
              <FiSearch />
            </div>
            <div>Waiting Clients</div>
            <div style={{ textAlign: 'right', paddingTop: '4px' }}>
              {' '}
              <Switch
                onChange={hanldeToggle}
                checked={toggleBookedClients}
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
                onColor="#c737a1"
                offColor="#FFD700"
              />
            </div>
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
                  client.Status
                    ? client.Status.postpone === false &&
                      client.Booking === false
                    : true
                )
                .filter((client) => client.RegisteredBy === UserEmail)
                .map((client) => (
                  <Client
                    key={client.id}
                    client={client}
                    handleDragOver={handleDragOver}
                    handleDragStart={handleDragStart}
                  />
                ))
            : ''}
        </div>
      ) : (
        <div
          className="overlap-2"
          onDragStart={(event) => event.preventDefault()}
        >
          <div className="text-wrapper-13">
            <div style={{ alignSelf: 'center' }}>
              <FiSearch />
            </div>
            <div>Booked Clients</div>
            <div style={{ textAlign: 'right', paddingTop: '4px' }}>
              {' '}
              <Switch
                onChange={hanldeToggle}
                checked={toggleBookedClients}
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
                onColor="#c737a1"
                offColor="#FFD700"
              />
            </div>
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
                .filter((client) => (client ? client.Booking === true : false))
                .map((client) => <Client key={client.id} client={client} />)
            : ''}
        </div>
      )}
      {!checked ? (
        <div
          className="cards-elevation"
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDrop(event)}
          onDragStart={(event) => event.preventDefault()}
        >
          <div className="text-wrapper-13">
            <div style={{ alignSelf: 'center' }}>
              <FiSearch />
            </div>
            <div> Sent Clients</div>
            <div style={{ textAlign: 'right', paddingTop: '4px' }}>
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
            ? sentClients
                .filter((client) => client.RegisteredBy === UserEmail)
                .map((client) => (
                  <Client
                    key={client.id}
                    client={client}
                    handleDragOver={handleDragOver}
                  />
                ))
            : ''}
        </div>
      ) : (
        <div className="cards-elevation">
          <div className="text-wrapper-13">
            <div style={{ alignSelf: 'center' }}>
              <FiSearch />
            </div>
            <div> Scheduled Clients</div>
            <div style={{ textAlign: 'right', paddingTop: '4px' }}>
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
            ? scheduledClients
                .filter((client) => client.RegisteredBy === UserEmail)
                .map((client) => (
                  <Client
                    key={client.id}
                    client={client}
                    handleDragStart={handleDragStart}
                  />
                ))
            : ''}
        </div>
      )}
    </div>
  );
};

export default LobbyDashboard;
