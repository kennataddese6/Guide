import SideBar from '../items/SideBar';
import ChangePassowrd from '../items/ChangePassword';
const Settings = ({ online }) => {
  return (
    <>
      <SideBar index={5} online={online} />
      <ChangePassowrd />
    </>
  );
};
export default Settings;
