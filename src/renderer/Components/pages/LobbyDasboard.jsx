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
import { getCustomers, reset } from 'renderer/features/customers/customerSlice';
import Switch from 'react-switch';

const LobbyDashboard = () => {
  const [clients, setClients] = useState('');
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
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.customer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toHomepage = () => {
    navigate('/');
  };
  useEffect(() => {
    if (message) {
      setClients(message);
    }
  }, [message]);
  useEffect(() => {
    dispatch(getCustomers());
    dispatch(reset());
  }, []);
  const [checked, setChecked] = useState(false);

  function handleChange(checked) {
    setChecked(checked);
  }
  return (
    <div className="dashboard">
      <SideBar index={1} />
      <div className="div-wrapper">
        <RegisterCustomer role="Customer" />
      </div>
      <div className="cards-elevation">
        <div className="text-wrapper-6">Sent Clients</div>
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
              onColor="#c737a1" // add this line
              offColor="#FFD700" // add this line
            />
          </div>
        </div>
        {clients
          ? clients.map((client) => {
              const randomColor =
                Colors[Math.floor(Math.random() * Colors.length)];
              return (
                <div className="comments-elements">
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
      <Navbar />
    </div>
  );
};

export default LobbyDashboard;
