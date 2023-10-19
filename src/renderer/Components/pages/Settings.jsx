import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SideBar from '../items/SideBar';
import FloorSideBar from '../items/FloorSidebar';
import ChangePassowrd from '../items/ChangePassword';
import AdminSideBar from '../items/AdminSidebar';
const Settings = ({ online }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);
  return (
    <>
      {location.state === 1 ? (
        <SideBar index={5} online={online} />
      ) : location.state === 2 ? (
        <FloorSideBar index={5} online={online} />
      ) : location.state === 3 ? (
        <AdminSideBar index={5} />
      ) : null}
      <ChangePassowrd />
    </>
  );
};
export default Settings;
