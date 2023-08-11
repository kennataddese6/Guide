import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaUsers } from 'react-icons/fa';
import { FiChevronDown, FiSettings, FiMessageSquare } from 'react-icons/fi';
import { IoMdAnalytics, IoIosNotifications } from 'react-icons/io';
import { BiTask } from 'react-icons/bi';
import { MdAssignment } from 'react-icons/md';
const SideBar = ({ index }) => {
  const SideBarIndex = index;
  const navigate = useNavigate();
  const toLobbyDashboard = () => {
    navigate('/LobbyDasboard');
  };
  const toMessages = () => {
    navigate('/Messages');
  };
  return (
    <div className="div">
      <div className="navigation-example">
        <div className="overlap">
          <div className="navigation-elements">
            <div className="divider" />
          </div>
          <div className="navigation-elements-2">
            {' '}
            <img
              className="avatar-man"
              alt="Avatar man"
              src="data:image/jpeg;base64,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"
            />
            <div className="divider-2" />
            <div className="icon-navigation">
              <FiChevronDown style={{ color: 'white ' }} />
            </div>
            <div className="text-wrapper">Receptionist Name</div>
          </div>
          <div className="navigation-elements-3">
            {' '}
            <div className="navigation-elements-4">
              <FiSettings className="iconSetting" style={{ color: 'black' }} />
              <div className="text-wrapper-2">Main Settings</div>
            </div>
            <div className="text-wrapper-3">Settings</div>
          </div>
          <div
            className="overlap-group-wrapper"
            onClick={toLobbyDashboard}
            style={{ backgroundColor: SideBarIndex === 1 ? 'gold' : '' }}
          >
            {' '}
            <div className="overlap-group">
              {' '}
              <IoMdAnalytics
                className="icon-action"
                style={{ color: 'black' }}
              />{' '}
              <div className="text-wrapper-4">Dashboard</div>
            </div>
          </div>
          <div
            className="navigation-elements-5"
            style={{ backgroundColor: SideBarIndex === 2 ? 'gold' : '' }}
            onClick={toMessages}
          >
            <div className="overlap-group">
              <FiMessageSquare
                className="icon-action"
                style={{ color: 'black' }}
              />
              <div className="text-wrapper-4">Messages</div>
            </div>
          </div>
          <div className="navigation-elements-6">
            <MdAssignment className="iconSetting" style={{ color: 'black' }} />
            <div className="text-wrapper-2">Register</div>
          </div>
        </div>
        <div className="navigation-elements-7">
          <FaUsers className="iconSetting" style={{ color: 'black' }} />
          <div className="text-wrapper-2">Clients</div>
        </div>
        <div className="navigation-elements-8">
          <IoIosNotifications
            className="iconSetting"
            style={{ color: 'black' }}
          />
          <div className="text-wrapper-2">Notifications</div>
        </div>
      </div>
      <div className="divider-3" />
    </div>
  );
};

export default SideBar;
