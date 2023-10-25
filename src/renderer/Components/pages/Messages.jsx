import SideBar from '../items/SideBar';
import '../styles/Messages.css';
import FloorReceptionists from '../items/FloorReceptionists';
import Conversations from '../items/Conversations';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UpdateGuide from '../items/UpdateGuide';
const Messages = ({ online }) => {
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);
  return (
    <div className="MessageDashboard">
      {showUpdatePopup && (
        <UpdateGuide setShowUpdatePopup={setShowUpdatePopup} />
      )}
      <SideBar
        index={2}
        online={online}
        setShowUpdatePopup={setShowUpdatePopup}
      />
      <div className="userHeader">
        <h3>Conversations</h3>
      </div>
      <div className="UserContainer">
        <FloorReceptionists
          selectedFloor={selectedFloor}
          setSelectedFloor={setSelectedFloor}
          setPhoneNumber={setPhoneNumber}
          PhoneNumber={phoneNumber}
        />
      </div>
      <div className="ConversationsBoard">
        <Conversations floorNumber={selectedFloor} phoneNmber={phoneNumber} />
      </div>
    </div>
  );
};

export default Messages;
