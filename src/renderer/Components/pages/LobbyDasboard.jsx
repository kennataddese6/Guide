import SideBar from '../items/SideBar';
import Navbar from '../items/Navbar';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaUsers } from 'react-icons/fa';
import { FiChevronDown, FiSettings, FiMessageSquare } from 'react-icons/fi';
import { IoMdAnalytics, IoIosNotifications } from 'react-icons/io';
import { BiTask } from 'react-icons/bi';
import { MdAssignment } from 'react-icons/md';
import { FiMoreVertical } from 'react-icons/fi';
import { FiAlertCircle } from 'react-icons/fi';
import '../styles/LobbyDasboard.css';
import RegisterCustomer from '../items/RegisterCustomer';
const LobbyDashboard = () => {
  const navigate = useNavigate();
  const toHomepage = () => {
    navigate('/');
  };
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
          <div className="comments-elements-2">
            <img
              className="img-2"
              alt="Avatar man"
              src="https://www.publicbooks.org/wp-content/uploads/2019/11/joel-mott-LaK153ghdig-unsplash-scaled-e1574787737429.jpg"
            />
            <div className="text-wrapper-9">George Fields</div>
            <div className="text-wrapper-10">Human Resouces</div>
            <FiMoreVertical className="icon-navigation-more" />
          </div>
          <div className="comments-elements-3">
            <img
              className="img-2"
              alt="Avatar man"
              src="https://www.publicbooks.org/wp-content/uploads/2019/11/joel-mott-LaK153ghdig-unsplash-scaled-e1574787737429.jpg"
            />
            <div className="text-wrapper-11">Jones Dermot</div>
            <div className="text-wrapper-10">Finance</div>
            <FiMoreVertical className="icon-navigation-more" />
          </div>
          <div className="comments-elements-4">
            <img
              className="img-2"
              alt="Avatar woman"
              src="https://www.publicbooks.org/wp-content/uploads/2019/11/joel-mott-LaK153ghdig-unsplash-scaled-e1574787737429.jpg"
            />
            <div className="text-wrapper-12">Jane Doe</div>
            <div className="text-wrapper-10">Legal Issue</div>
            <FiMoreVertical className="icon-navigation-more" />
          </div>
          <div className="text-wrapper-13">Waiting Clients</div>
        </div>
        <Navbar />
    </div>
  );
};

export default LobbyDashboard;
