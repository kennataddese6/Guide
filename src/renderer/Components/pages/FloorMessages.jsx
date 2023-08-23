import { logout } from 'renderer/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloorSideBar from '../items/FloorSidebar';
import FloorReceptionists from '../items/FloorReceptionists';
import FloorConversations from '../items/FloorConversations';
const FloorMessages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);
  return (
    <>
      <div className="MessageDashboard">
        <FloorSideBar index={2} />{' '}
        <div className="userHeader">
          <h3>Conversations</h3>
        </div>
        <div className="UserContainer">
          <div
            className="ReceptionistContainer"
            style={{ backgroundColor: 'lightblue' }}
          >
            <h3 className="ReceptionistName">Lobby Receptionist</h3>

            <p className="messageContent">This is the message content</p>
            <div className="img-9">L</div>

            <p className="TimeandDate"> 7/19/2013</p>
          </div>
        </div>
        <div className="ConversationsBoard">
          <FloorConversations floorNumber={user ? user.FloorNumber : ''} />
        </div>
      </div>
    </>
  );
};
export default FloorMessages;
