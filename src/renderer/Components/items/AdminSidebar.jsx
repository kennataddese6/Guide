import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaUsers } from 'react-icons/fa';
import { FiChevronDown, FiSettings, FiMessageSquare } from 'react-icons/fi';
import { IoMdAnalytics, IoIosNotifications } from 'react-icons/io';
import { BiTask } from 'react-icons/bi';
import { MdAssignment } from 'react-icons/md';
import { logout } from 'renderer/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
const AdminSideBar = ({ index }) => {
  const SideBarIndex = index;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const toRegister = () => {
    navigate('/Register');
  };
  const toLoginPage = () => {
    navigate('/');
  };
  const toLogin = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (!user) {
      toLoginPage();
    }
  }, [user]);
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
                src="
                https://www.newarab.com/sites/default/files/886938950.jpeg
                "
              />
              <div className="divider-2" />
              <div className="icon-navigation" onClick={toLogin}>
                <FiChevronDown style={{ color: 'white ' }} />
              </div>
              <div className="text-wrapper">Admin</div>
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

export default AdminSideBar;
