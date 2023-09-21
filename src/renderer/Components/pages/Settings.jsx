import SideBar from '../items/SideBar';
const Settings = ({online}) => {
  return (
    <>
      <SideBar online={online} />
      <h1> This is Settings Page</h1>
    </>
  );
};
export default Settings;
