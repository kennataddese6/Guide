import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaUsers, FaBuilding } from 'react-icons/fa';
import { FiChevronDown, FiSettings, FiMessageSquare } from 'react-icons/fi';
import { IoMdAnalytics, IoIosNotifications } from 'react-icons/io';
import { BiTask } from 'react-icons/bi';
import { MdAssignment } from 'react-icons/md';
import { logout } from 'renderer/features/auth/authSlice';
import { useDispatch } from 'react-redux';
const SideBar = ({ index }) => {
  const SideBarIndex = index;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toLobbyDashboard = () => {
    navigate('/LobbyDasboard');
  };
  const toMessages = () => {
    navigate('/Messages');
  };

  const toLogin = () => {
    dispatch(logout());
  };
  return (
    <div className="dashboard">
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
              <div className="icon-navigation" onClick={toLogin}>
                <FiChevronDown style={{ color: 'white ' }} />
              </div>
              <div className="text-wrapper">Lobby Receptionist</div>
            </div>
            <div className="navigation-elements-3">
              {' '}
              <div className="navigation-elements-4">
                <FiSettings
                  className="iconSetting"
                  style={{ color: 'black' }}
                />
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
            <div
              className="navigation-elements-6"
              style={{ backgroundColor: SideBarIndex === 3 ? 'gold' : '' }}
            >
              <div className="overlap-group">
                <FaBuilding
                  className="icon-action"
                  style={{ color: 'black' }}
                />
                <div className="text-wrapper-4">Floors</div>
              </div>
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
    </div>
  );
};

export default SideBar;
