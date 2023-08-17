import SideBar from '../items/SideBar';
import Spinner from '../Utilities/Spinner';
const Messages = () => {
  return (
    <div className="dashboard">
      <div className="div">
        <SideBar index={2} />
        <div style={{ position: 'absolute', top: '50%' }}>
          <Spinner />
        </div>
      </div>
    </div>
  );
};

export default Messages;
