import SideBar from '../items/SideBar';
import '../styles/Messages.css';
import FloorReceptionists from '../items/FloorReceptionists';
import Spinner from '../Utilities/Spinner';
import Conversations from '../items/Conversations';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Messages = () => {
  const [selectedFloor, setSelectedFloor] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);
  return (
    <div className="MessageDashboard">
      <SideBar index={2} />
      <div className="userHeader">
        <h3>Conversations</h3>
      </div>
      <div className="UserContainer">
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
