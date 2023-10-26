import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloorSideBar from '../items/FloorSidebar';
import FloorConversations from '../items/FloorConversations';
import { login } from 'renderer/features/auth/authSlice';
import { ws } from 'renderer/webSocket';
import { getFloorCustomers } from 'renderer/features/customers/customerSlice';
import UpdateGuide from '../items/UpdateGuide';

const FloorMessages = ({ online, updateAvailable }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [incomingMessage, setIncomingMessage] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  const [floorCustomers, setFloorCustomers] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.customer);

  function trimMessage(message) {
    return message.length > 32 ? message.substring(0, 32) + '...' : message;
  }
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    if (message) {
      setFloorCustomers(message[0]);
      console.log(
        ' IIIIIIIIIIIIIIIIIIIIII haveeeeeee got the customers',
        message[0]
      );
    }
  }, [message]);

  useEffect(() => {
    console.log('this is step 1', reload);
    if (reload) {
      console.log('this is step 2', reload);
      const userData = {
        email: user.Email,
        password: user.Password,
      };
      dispatch(login(userData));
      dispatch(getFloorCustomers(user.FloorNumber));
      console.log('this is step 3', reload);
    }
    console.log('this is step 4', reload);

    setReload(false);
    console.log('this is step 5', reload);
  }, [reload]);
  function formatDate(dateString) {
    const date = moment(dateString);
    const now = moment();
    if (now.diff(date, 'days') >= 1) {
      return date.format('DD-MM-YYYY');
    } else {
      return date.format('HH:mm');
    }
  }
  ws.addEventListener('message', function () {
    setIncomingMessage(true);
  });
  useEffect(() => {
    console.log('here is the incoming message', incomingMessage);
    if (incomingMessage) {
      const userData = {
        email: user ? user.Email : '',
        password: user ? user.Password : '',
      };
      dispatch(login(userData));
      dispatch(getFloorCustomers(user.FloorNumber));
    }
    setIncomingMessage(false);
  }, [incomingMessage]);
  return (
    <>
      <div className="MessageDashboard">
        {showUpdatePopup && (
          <UpdateGuide setShowUpdatePopup={setShowUpdatePopup} />
        )}
        <FloorSideBar
          index={2}
          online={online}
          updateAvailable={updateAvailable}
          setShowUpdatePopup={setShowUpdatePopup}
        />{' '}
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
              {floorCustomers && floorCustomers.Booking
                ? ` ${trimMessage(
                    `${floorCustomers.FirstName} has been booked`
                  )}`
                : floorCustomers.Status && floorCustomers.Status.postpone
                ? `${trimMessage(
                    `${floorCustomers.FirstName} has been scheduled`
                  )}`
                : floorCustomers.Arrived
                ? `${trimMessage(`${floorCustomers.FirstName} has Arrived`)}`
                : floorCustomers.Sent
                ? `${trimMessage(``)} I have sent ${floorCustomers.FirstName}`
                : floorCustomers.Accepted
                ? ` Let ${floorCustomers.FirstName} come`
                : floorCustomers.Waiting
                ? `${trimMessage(`${floorCustomers.FirstName} Wants to come
                to ${floorCustomers.Department}`)}
                `
                : 'Sorry. Nothing to Show.'}
            </p>
            <div className="img-9">L</div>

            <p className="TimeandDate">
              {' '}
              {formatDate(floorCustomers ? floorCustomers.updatedAt : '')}
            </p>
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
