import SideBar from '../items/SideBar';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaUsers } from 'react-icons/fa';
import { FiChevronDown, FiSettings, FiMessageSquare } from 'react-icons/fi';
import { IoMdAnalytics, IoIosNotifications } from 'react-icons/io';
import { BiTask } from 'react-icons/bi';
import { MdAssignment } from 'react-icons/md';
import { FiMoreVertical } from 'react-icons/fi';
import { FiAlertCircle } from 'react-icons/fi';
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
          <div className="comments-elements-2">
            <img
              className="img-2"
              alt="Avatar man"
              src="https://www.publicbooks.org/wp-content/uploads/2019/11/joel-mott-LaK153ghdig-unsplash-scaled-e1574787737429.jpg"
            />
            <div className="text-wrapper-9">George Fields</div>
            <div className="text-wrapper-10">New York, NY</div>
            <FiMoreVertical className="icon-navigation-more" />
          </div>
          <div className="comments-elements-3">
            <img
              className="img-2"
              alt="Avatar man"
              src="https://www.publicbooks.org/wp-content/uploads/2019/11/joel-mott-LaK153ghdig-unsplash-scaled-e1574787737429.jpg"
            />
            <div className="text-wrapper-11">Jones Dermot</div>
            <div className="text-wrapper-10">San Francisco, CA</div>
            <FiMoreVertical className="icon-navigation-more" />
          </div>
          <div className="comments-elements-4">
            <img
              className="img-2"
              alt="Avatar woman"
              src="https://www.publicbooks.org/wp-content/uploads/2019/11/joel-mott-LaK153ghdig-unsplash-scaled-e1574787737429.jpg"
            />
            <div className="text-wrapper-12">Jane Doe</div>
            <div className="text-wrapper-10">New York, NY</div>
            <FiMoreVertical className="icon-navigation-more" />
          </div>
          <div className="text-wrapper-13">New Clients</div>
        </div>
        <div className="overlap-4">
          <FaUsers className="img-3" style={{ color: 'black' }} />
          <div className="text-wrapper-14">128</div>
          <div className="text-wrapper-15">Clients</div>
        </div>
        <div className="overlap-5">
          <IoIosNotifications
            className="img-3"
            style={{ color: 'black' }}
          />
          <div className="text-wrapper-14">2</div>
          <div className="text-wrapper-15">Notifications</div>
        </div>
        <div className="overlap-6">
          <FiAlertCircle className="img-3" style={{ color: 'black' }} />
          <div className="text-wrapper-14">4</div>
          <div className="text-wrapper-15">Reports</div>
        </div>
        <div className="overlap-7">
          <BiTask className="img-3" style={{ color: 'black' }} />
          <div className="overlap-8">
            <div className="text-wrapper-16">32</div>
          </div>
          <div className="text-wrapper-17">Completed tasks</div>
        </div>
      </div>
    </div>
  );
};

export default LobbyDashboard;
