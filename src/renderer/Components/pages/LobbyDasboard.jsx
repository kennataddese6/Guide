import SideBar from '../items/SideBar';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaUsers } from 'react-icons/fa';
import { FiChevronDown, FiSettings, FiMessageSquare } from 'react-icons/fi';
import { IoMdAnalytics, IoIosNotifications } from 'react-icons/io';
import { BiTask } from 'react-icons/bi';
import { MdAssignment } from 'react-icons/md';
import { FiMoreVertical } from 'react-icons/fi';
import './LobbyDasboard.css';
const LobbyDashboard = () => {
  const navigate = useNavigate();
  const toHomepage = () => {
    navigate('/');
  };
  return (
    <div className="dashboard">
      <div className="div">
        <SideBar />
        <div className="div-wrapper">
          <div className="text-wrapper-5">Cient Registeration</div>
        </div>
        <div className="cards-elevation">
          <div className="text-wrapper-6">New Clients</div>
        </div>
        <div className="overlap-2">
          <div className="comments-elements">
            <img
              className="img-2"
              alt="Avatar woman"
              src="https://www.publicbooks.org/wp-content/uploads/2019/11/joel-mott-LaK153ghdig-unsplash-scaled-e1574787737429.jpg"
            />
            <div className="overlap-3">
              <div className="text-wrapper-7">Haliu Abate </div>
              <div className="text-wrapper-8">System Development</div>
            </div>
            <FiMoreVertical className="icon-navigation-more" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyDashboard;
