import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SideBar from '../items/SideBar';
import FloorSideBar from '../items/FloorSidebar';
import ChangePassowrd from '../items/ChangePassword';
import AdminSideBar from '../items/AdminSidebar';
import UpdateGuide from '../items/UpdateGuide';

const Settings = ({ online, updateAvailable }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);
  return (
    <>
      {showUpdatePopup && (
        <UpdateGuide setShowUpdatePopup={setShowUpdatePopup} />
      )}{' '}
      {location.state === 1 ? (
        <SideBar
          index={5}
          online={online}
          setShowUpdatePopup={setShowUpdatePopup}
          updateAvailable={updateAvailable}
        />
      ) : location.state === 2 ? (
        <FloorSideBar
          index={5}
          online={online}
          updateAvailable={updateAvailable}
          setShowUpdatePopup={setShowUpdatePopup}
        />
      ) : location.state === 3 ? (
        <AdminSideBar
          index={5}
          updateAvailable={updateAvailable}
          setShowUpdatePopup={setShowUpdatePopup}
        />
      ) : null}
      <ChangePassowrd />
    </>
  );
};
export default Settings;
