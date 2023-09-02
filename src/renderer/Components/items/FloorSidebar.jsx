import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaUsers } from 'react-icons/fa';
import { FiChevronDown, FiSettings, FiMessageSquare } from 'react-icons/fi';
import { IoMdAnalytics, IoIosNotifications } from 'react-icons/io';
import { BiTask } from 'react-icons/bi';
import { MdAssignment } from 'react-icons/md';
import { logout } from 'renderer/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useWebSocket } from 'renderer/features/hook/useWebSocket';
import useColorAndBrightness from 'renderer/features/hook/useColorAndBrightness';
const FloorSideBar = ({ index }) => {
  const SideBarIndex = index;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const online = useWebSocket('ws://localhost:5000');
  const { user } = useSelector((state) => state.auth);
  const { color, isLightColor } = useColorAndBrightness(
    user ? user.FirstName + user.LastName : ''
  );
  const toLogin = () => {
    dispatch(logout());
  };
  const toFloorMessages = () => {
    navigate('/FloorMessages');
  };
  const toFloorDashboard = () => {
    navigate('/FloorDashboard');
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
              <div
                className="avatar-man"
                alt="Avatar man"
                style={{
                  backgroundColor: color,
                  color: isLightColor ? 'black' : 'white',
                }}
              >
                {user ? user.FirstName[0].toUpperCase() : ''}
              </div>
              <div
                className="status-circle"
                style={{ backgroundColor: online ? 'green' : 'grey' }}
              ></div>
              <div className="divider-2" />
              <div className="icon-navigation" onClick={toLogin}>
                <FiChevronDown style={{ color: 'white ' }} />
              </div>
              <div className="text-wrapper">
                ({user ? user.FloorNumber : ''}) Floor Receptionist
              </div>
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
              onClick={toFloorDashboard}
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
              onClick={() => {
                toFloorMessages();
              }}
              style={{ backgroundColor: SideBarIndex === 2 ? 'gold' : '' }}
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
                <MdAssignment
                  className="icon-action"
                  style={{ color: 'black' }}
                />
                <div className="text-wrapper-4">Register</div>
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

export default FloorSideBar;
