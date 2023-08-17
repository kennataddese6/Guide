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
import { FiAlertCircle } from 'react-icons/fi';
import '../styles/LobbyDasboard.css';
import RegisterCustomer from '../items/RegisterCustomer';
import { getCustomers, reset } from 'renderer/features/customers/customerSlice';
const LobbyDashboard = () => {
  const [clients, setClients] = useState('');
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
      console.log(typeof message);
      setClients(message);
    }
  }, [message]);
  console.log('here are the cusomers', clients);
  useEffect(() => {
    dispatch(getCustomers());
    dispatch(reset());
  }, []);
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
        <div className="text-wrapper-13">Waiting Clients</div>
        {clients
          ? clients.map((client) => (
              <div className="comments-elements">
                <div className="img-2" alt="Avatar woman">
                  {' '}
                  {client.FirstName[0]}
                </div>
                <div className="overlap-3">
                  <p>
                    {client.FirstName} {client.LastName}{' '}
                  </p>
                  <p style={{ marginTop: '-10px', fontStyle: 'italic' }}>
                    {client.Department}
                  </p>
                </div>
                <FiMoreVertical className="icon-navigation-more" />
              </div>
            ))
          : ''}
      </div>
      <Navbar />
    </div>
  );
};

export default LobbyDashboard;
