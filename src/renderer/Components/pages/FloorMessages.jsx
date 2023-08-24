import { logout } from 'renderer/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloorSideBar from '../items/FloorSidebar';
import FloorReceptionists from '../items/FloorReceptionists';
import FloorConversations from '../items/FloorConversations';
import { login } from 'renderer/features/auth/authSlice';
const FloorMessages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const { user } = useSelector((state) => state.auth);

  function trimMessage(message) {
    return message.length > 32 ? message.substring(0, 32) + '...' : message;
  }
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    console.log('this is step 1', reload);
    if (reload) {
      console.log('this is step 2', reload);
      const userData = {
        email: user.Email,
        password: user.Password,
      };
      dispatch(login(userData));
      console.log('this is step 3', reload);
    }
    console.log('this is step 4', reload);

    setReload(false);
    console.log('this is step 5', reload);
  }, [reload]);
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

            <p className="messageContent">
              {user && user.LatestMessage
                ? trimMessage(user.LatestMessage)
                : 'Sorry. Nothing to show!'}
            </p>
            <div className="img-9">L</div>

            <p className="TimeandDate"> 7/19/2013</p>
          </div>
        </div>
        <div className="ConversationsBoard">
          <FloorConversations
            floorNumber={user ? user.FloorNumber : ''}
            reload={reload}
            setReload={setReload}
          />
        </div>
      </div>
    </>
  );
};
export default FloorMessages;
