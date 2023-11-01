import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloorSideBar from '../items/FloorSidebar';
import FloorConversations from '../items/FloorConversations';
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
    }
  }, [message]);

  useEffect(() => {
    if (reload) {
      dispatch(getFloorCustomers(user.FloorNumber));
    }

    setReload(false);
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
    if (incomingMessage) {
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
                    `${floorCustomers.FirstName} ${floorCustomers.LastName} has been booked`
                  )}`
                : floorCustomers &&
                  floorCustomers.Status &&
                  floorCustomers.Status.postpone
                ? `${trimMessage(
                    `${floorCustomers.FirstName} ${floorCustomers.LastName} has been scheduled`
                  )}`
                : floorCustomers && floorCustomers.Arrived
                ? `${trimMessage(
                    `${floorCustomers.FirstName} ${floorCustomers.LastName}  has Arrived`
                  )}`
                : floorCustomers && floorCustomers.Sent
                ? `${trimMessage(``)} I have sent ${floorCustomers.FirstName} ${
                    floorCustomers.LastName
                  } `
                : floorCustomers && floorCustomers.Accepted
                ? `Yes. Let ${floorCustomers.FirstName} ${floorCustomers.LastName} come.`
                : floorCustomers && floorCustomers.Waiting
                ? `${trimMessage(`${floorCustomers.FirstName} ${floorCustomers.LastName}  Wants to come
                to ${floorCustomers.Department}`)}
                `
                : 'Sorry. Nothing to Show.'}
            </p>
            <div className="img-9">L</div>

            <p className="TimeandDate">
              {' '}
              {formatDate(
                floorCustomers && floorCustomers.updatedAt
                  ? floorCustomers.updatedAt
                  : user.createdAt
              )}
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
