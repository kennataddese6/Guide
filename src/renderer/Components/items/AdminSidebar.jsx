import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
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
import { useEffect, useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

const AdminSideBar = ({ index, updateAvailable, setShowUpdatePopup }) => {
  const SideBarIndex = index;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [shwoLogout, setShowLogout] = useState(true);

  const toRegister = () => {
    navigate('/Register');
  };
  const toAdminDashobard = () => {
    navigate('/AdminDashboard');
  };

  const toLoginPage = () => {
    navigate('/');
  };
  const toLogin = () => {
    dispatch(logout());
  };
  const toAdminView = () => {
    navigate('/AdminView');
  };
  const toSettings = () => {
    navigate('/Settings', { state: 3 });
  };
  useEffect(() => {
    if (!user) {
      toLoginPage();
    }
  }, [user]);
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
                  backgroundColor: 'white',
                  color: 'black',
                }}
              >
                {user ? user.FirstName[0] : ''}
              </div>
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
              <div className="text-wrapper">Admin</div>
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
              style={{ backgroundColor: SideBarIndex === 1 ? 'gold' : '' }}
              onClick={toAdminDashobard}
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
              onClick={toRegister}
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
          <div
            className="navigation-elements-7"
            onClick={toAdminView}
            style={{ backgroundColor: SideBarIndex === 4 ? 'gold' : '' }}
          >
            <div className="overlap-group">
              <FaEye className="icon-action" style={{ color: 'black' }} />
              <div className="text-wrapper-4">View</div>
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

export default AdminSideBar;
