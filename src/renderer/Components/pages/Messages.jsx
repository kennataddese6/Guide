import SideBar from '../items/SideBar';
import '../styles/Messages.css';
import FloorReceptionists from '../items/FloorReceptionists';
import Spinner from '../Utilities/Spinner';
const Messages = () => {
  return (
    <div className="MessageDashboard">
      <SideBar index={2} />
      <div className="UserContainer">
        <div className="userHeader">
          <h3>Conversations</h3>
        </div>
        <FloorReceptionists />
      </div>
      <div className="ConversationsBoard"></div>
    </div>
  );
};

export default Messages;
