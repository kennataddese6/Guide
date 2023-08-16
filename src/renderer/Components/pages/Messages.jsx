import SideBar from '../items/SideBar';
import Spinner from '../Utilities/Spinner';
const Messages = () => {
  return (
    <div className="dashboard">
      <div className="div">
        <SideBar index={2} />
        <Spinner />
      </div>
    </div>
  );
};

export default Messages;
