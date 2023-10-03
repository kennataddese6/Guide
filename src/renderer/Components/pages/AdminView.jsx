import AdminSideBar from '../items/AdminSidebar';
import { FaUsers, FaBuilding } from 'react-icons/fa';
import { useState } from 'react';

const AdminView = () => {
  const [selected, setSelected] = useState(1);
  return (
    <>
      <AdminSideBar index={4} />
      <div
        className={selected === 1 ? 'headerOneSelected' : 'headerOne'}
        onClick={() => {
          setSelected(1);
        }}
      >
        <FaUsers fontSize={'20px'} />
        <p className="headerTtile"> Users</p>
      </div>
      <div
        className="headerTwo"
        className={selected === 2 ? 'headerTwoSelected' : 'headerTwo'}
        onClick={() => {
          setSelected(2);
        }}
      >
        <FaBuilding />
        <p className="headerTtile"> Floors</p>
      </div>
      <p>Hello this is admin page</p>
    </>
  );
};
export default AdminView;
