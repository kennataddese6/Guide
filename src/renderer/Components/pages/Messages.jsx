import SideBar from '../items/SideBar';
import '../styles/Messages.css';
import FloorReceptionists from '../items/FloorReceptionists';
import Spinner from '../Utilities/Spinner';
import Conversations from '../items/Conversations';
import { useState } from 'react';

const Messages = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);

  return (
    <div className="MessageDashboard">
      <SideBar index={2} />
      <div className="UserContainer">
        <div className="userHeader">
          <h3>Conversations</h3>
        </div>
        <FloorReceptionists
          selectedFloor={selectedFloor}
          setSelectedFloor={setSelectedFloor}
        />
      </div>
      <div className="ConversationsBoard">
        <Conversations floorNumber={selectedFloor} />
      </div>
    </div>
  );
};

export default Messages;
