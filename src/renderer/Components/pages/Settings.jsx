import { useLocation } from 'react-router-dom';
import SideBar from '../items/SideBar';
import FloorSideBar from '../items/FloorSidebar';
import ChangePassowrd from '../items/ChangePassword';
const Settings = ({ online }) => {
  const location = useLocation();
  console.log(location.state);
  return (
    <>
      {location.state ? (
        <SideBar index={5} online={online} />
      ) : (
        <FloorSideBar index={5} online={online} />
      )}
      <ChangePassowrd />
    </>
  );
};
export default Settings;
