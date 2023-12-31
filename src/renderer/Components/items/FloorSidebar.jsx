import { useNavigate } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import {
  FiChevronDown,
  FiSettings,
  FiMessageSquare,
  FiChevronUp,
} from 'react-icons/fi';
import { IoMdAnalytics } from 'react-icons/io';
import { MdAssignment } from 'react-icons/md';
import { logout } from 'renderer/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import useColorAndBrightness from 'renderer/features/hook/useColorAndBrightness';
import { FiRefreshCw } from 'react-icons/fi';
import { useState } from 'react';

const FloorSideBar = ({
  index,
  online,
  updateAvailable,
  setShowUpdatePopup,
}) => {
  const SideBarIndex = index;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [shwoLogout, setShowLogout] = useState(true);
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
  const toBooking = () => {
    navigate('/Booking');
  };
  const toFloorClients = () => {
    navigate('/FloorClients');
  };
  const toSettings = () => {
    navigate('/Settings', { state: 2 });
  };
  const showUpdatePopup = () => {
    setShowUpdatePopup(true);
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
              {shwoLogout ? (
                <div
                  className="icon-navigation"
                  onClick={() => {
                    setShowLogout(false);
                  }}
                >
                  <FiChevronDown style={{ color: 'white ' }} />
                </div>
              ) : (
                <div
                  className="icon-navigation"
                  onClick={() => {
                    setShowLogout(true);
                  }}
                >
                  <FiChevronUp style={{ color: 'white ' }} />
                  <button className="logoutButton" onClick={toLogin}>
                    {' '}
                    Logout
                  </button>
                </div>
              )}
              <div className="text-wrapper">
                ({user ? user.FloorNumber : ''}) Floor Receptionist
              </div>
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
              onClick={() => {
                toBooking();
              }}
            >
              <div className="overlap-group">
                <MdAssignment
                  className="icon-action"
                  style={{ color: 'black' }}
                />
                <div className="text-wrapper-4">Book</div>
              </div>
            </div>
          </div>
          <div
            className="navigation-elements-7"
            style={{ backgroundColor: SideBarIndex === 4 ? 'gold' : '' }}
            onClick={() => {
              toFloorClients();
            }}
          >
            <div className="overlap-group">
              <FaUsers className="icon-action" style={{ color: 'black' }} />
              <div className="text-wrapper-4">Clients</div>
            </div>
          </div>
          <div className="navigation-elements-8">
            <FiRefreshCw className="iconSetting" style={{ color: 'black' }} />
            <div
              className="text-wrapper-2"
              style={{ display: 'flex', flexDirection: 'row' }}
              onClick={() => {
                updateAvailable ? showUpdatePopup() : null;
              }}
            >
              Update{' '}
              {updateAvailable ? <div className="update-circle">1</div> : ''}
            </div>
          </div>
        </div>
        <div className="divider-3" />
      </div>
    </div>
  );
};

export default FloorSideBar;
