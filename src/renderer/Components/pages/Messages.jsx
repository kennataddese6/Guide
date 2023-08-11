import SideBar from '../items/SideBar';
import Navbar from '../items/Navbar';

const Messages = () => {
  return (
    <div className="dashboard">
      <div className="div">
        <Navbar />
        <SideBar index={2} />
      </div>
    </div>
  );
};

export default Messages;
