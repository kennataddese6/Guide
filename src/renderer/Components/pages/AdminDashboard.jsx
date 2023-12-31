import AdminSidebar from '../items/AdminSidebar';
import Report from '../items/Report';
import { useState } from 'react';
import { FaChartBar, FaChartLine, FaTrafficLight } from 'react-icons/fa';
import LineChart from '../items/LineChart';
import PieChart from '../items/PieChart';
import UpdateGuide from '../items/UpdateGuide';
const AdminDashboard = ({ updateAvailable }) => {
  const [selected, setSelected] = useState(1);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  return (
    <>
      {showUpdatePopup && (
        <UpdateGuide setShowUpdatePopup={setShowUpdatePopup} />
      )}
      <div
        className={selected === 1 ? 'headerOneSelected' : 'headerOne'}
        onClick={() => {
          setSelected(1);
        }}
      >
        <FaChartBar />
        <p className="headerTtile">Bars</p>
      </div>
      <div
        className="headerTwo"
        className={selected === 2 ? 'headerTwoSelected' : 'headerTwo'}
        onClick={() => {
          setSelected(2);
        }}
      >
        <FaChartLine />
        <p className="headerTtile"> Charts</p>
      </div>
      <div
        className="headerTwo"
        style={{ marginLeft: '200px' }}
        className={selected === 3 ? 'headerTwoSelected' : 'headerTwo'}
        onClick={() => {
          setSelected(3);
        }}
      >
        <FaTrafficLight />
        <p className="headerTtile"> Traffic</p>
      </div>
      <AdminSidebar
        index={1}
        updateAvailable={updateAvailable}
        setShowUpdatePopup={setShowUpdatePopup}
      />
      {selected === 1 ? (
        <Report />
      ) : selected === 2 ? (
        <LineChart />
      ) : (
        <PieChart />
      )}
    </>
  );
};
export default AdminDashboard;
