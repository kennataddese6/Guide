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
} from 'renderer/features/customers/customerSlice';
import Switch from 'react-switch';
import Spinner from '../Utilities/Spinner';
import { updateLatestMessage } from '../../features/auth/authSlice';
const LobbyDashboard = () => {
  const [clients, setClients] = useState([]);
  const [checked, setChecked] = useState(false);

  const Colors = [
    '#000000',
    '#FFFFFF',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#800000',
    '#008000',
    '#000080',
    '#808000',
    '#800080',
    '#008080',
    '#C0C0C0',
    '#808080',
    '#9ACD32',
    '#FF7F0E',
    '#228B22',
    '#FFDAB9',
    '#556B2F',
    '#DC143C',
    '#0000CD',
    '#9470D3',
    '#8B0000',
    '#F08080',
    '#F000FF',
    '#FF0000',
    '#FFFF00',
    '#00FF00',
    '#0000FF',
    '#800000',
    '#008000',
    '#000080',
    '#808000',
    '#800080',
    '#008080',
    '#C0C0C0',
    '#808080',
    '#9ACD32',
    '#FF7F0E',
    '#228B22',
    '#FFDAB9',
    '#556B2F',
    '#DC143C',
    '#0000CD',
    '#9470D3',
    '#8B0000',
    '#F08080',
    '#F000FF',
  ];
  const lightColors = [
    '#FFFFFF',
    '#FFFF00',
    '#00FF00',
    '#C0C0C0',
    '#9ACD32',
    '#FFDAB9',
    '#F08080',
    '#00FFFF',
  ];
  const {
    isLoading,
    isError,
    isSuccess,
    message,
    isErrorGetCusomers,
    isLoadingGetCustomers,
  } = useSelector((state) => state.customer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toHomepage = () => {
    navigate('/');
  };
  useEffect(() => {
    if (message && message.length && !isErrorGetCusomers) {
      console.log('this is the error message', isErrorGetCusomers);
      console.log('this is the loading state', isLoadingGetCustomers);
      setClients(message);
      console.log('this is the type of message', typeof message);
      console.log('this is the length of the array', message.length);
    }
  }, [message, isErrorGetCusomers]);
  useEffect(() => {
    console.log('this is the loading stae of cusomers', isLoadingGetCustomers);
    console.log('this is the loading stae ', isLoading);
  }, [isLoadingGetCustomers, isLoading]);
  useEffect(() => {
    dispatch(getCustomers());
    console.log('this is the error message', isErrorGetCusomers);
    dispatch(reset());
  }, []);

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
    console.log('The client has beed droped', clientData);
    const composedMessage = {
      content:
        'I have sent ' + clientData.FirstName + ' ' + clientData.LastName,
      to: clientData.FloorNumber,
    };
    const updateData = {
      Sent: true,
      ID: clientData._id,
    };
    dispatch(updateLatestMessage(composedMessage));
    dispatch(updateCustomer(updateData));
  }

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
          ? clients.map((client) => {
              const randomColor =
                Colors[Math.floor(Math.random() * Colors.length)];
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
                      backgroundColor: randomColor,
                      color: lightColors.includes(randomColor)
                        ? 'black'
                        : 'white',
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
      <div
        className="cards-elevation"
        onDragOver={(event) => handleDragOver(event)}
        onDrop={(event) => handleDrop(event)}
      >
        <div className="text-wrapper-6">Sent Clients</div>
      </div>
    </div>
  );
};

export default LobbyDashboard;
