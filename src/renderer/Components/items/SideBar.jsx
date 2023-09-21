import { useNavigate } from 'react-router-dom';
import { FaUsers, FaBuilding } from 'react-icons/fa';
import { FiChevronDown, FiSettings, FiMessageSquare } from 'react-icons/fi';
import { IoMdAnalytics } from 'react-icons/io';
import { logout } from 'renderer/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import useColorAndBrightness from 'renderer/features/hook/useColorAndBrightness';
import { FiRefreshCw } from 'react-icons/fi';
const SideBar = ({ index, online }) => {
  const SideBarIndex = index;
  const onLine = online;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { color, isLightColor } = useColorAndBrightness(
    user ? user.FirstName + user.LastName : ''
  );
  const toLobbyDashboard = () => {
    navigate('/LobbyDasboard');
  };
  const toMessages = () => {
    navigate('/Messages');
  };
  const toClients = () => {
    navigate('/Clients');
  };
  const toFloors = () => {
    navigate('/Floors');
  };
  const toSettings = () => {
    navigate('/Settings');
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
              <div
                className="avatar-man"
                alt="Avatar man"
                style={{
                  backgroundColor: color,
                  color: isLightColor ? 'black' : 'white',
                }}
              >
                {user ? user.FirstName[0] : ''}
              </div>
              <div
                className="status-circle"
                style={{ backgroundColor: onLine ? 'green' : 'grey' }}
              ></div>
              <div className="divider-2" />
              <div className="icon-navigation" onClick={toLogin}>
                <FiChevronDown style={{ color: 'white ' }} />
              </div>
              <div className="text-wrapper">Lobby Receptionist</div>
            </div>
            <div className="navigation-elements-3">
              {' '}
              <div
                className="navigation-elements-4"
                onClick={toSettings}
                style={{ backgroundColor: SideBarIndex === 5 ? 'gold' : '' }}
              >
                <div className="overlap-group">
                  <FiSettings
                    className="icon-action"
                    style={{ color: 'black' }}
                  />
                  <div className="text-wrapper-4">Main Settings</div>
                </div>
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
              onClick={toFloors}
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
          <div
            className="navigation-elements-7"
            style={{ backgroundColor: SideBarIndex === 4 ? 'gold' : '' }}
            onClick={toClients}
          >
            <div className="overlap-group">
              <FaUsers className="icon-action" style={{ color: 'black' }} />
              <div className="text-wrapper-4">Clients</div>
            </div>
          </div>
          <div className="navigation-elements-8">
            <FiRefreshCw className="iconSetting" style={{ color: 'black' }} />
            <div className="text-wrapper-2">Update</div>
          </div>
        </div>
        <div className="divider-3" />
      </div>
    </div>
  );
};

export default SideBar;
