import { FaUsers } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { FiAlertCircle } from 'react-icons/fi';
import { BiTask } from 'react-icons/bi';
import '../styles/Navbar.css';
const Navbar = ({TotalClients, SentClients}) => {
  return (
    <>
      <div className="overlap-4">
        <FaUsers className="img-3" style={{ color: 'black' }} />
        <div className="text-wrapper-14">{TotalClients}</div>
        <div className="text-wrapper-15">Clients</div>
      </div>
      <div className="overlap-5">
        <IoIosNotifications className="img-3" style={{ color: 'black' }} />
        <div className="text-wrapper-14">0</div>
        <div className="text-wrapper-15">Notifications</div>
      </div>
      <div className="overlap-6">
        <FiAlertCircle className="img-3" style={{ color: 'black' }} />
        <div className="text-wrapper-14">0</div>
        <div className="text-wrapper-15">Reports</div>
      </div>
      <div className="overlap-7">
        <BiTask className="img-3" style={{ color: 'black' }} />
        <div className="overlap-8">
          <div className="text-wrapper-16">{SentClients}</div>
        </div>
        <div className="text-wrapper-17">Completed tasks</div>
      </div>
    </>
  );
};

export default Navbar;
