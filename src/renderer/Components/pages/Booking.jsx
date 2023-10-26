import FloorSideBar from '../items/FloorSidebar';
import BookCustomer from '../items/BookCustomer';
import { useState } from 'react';
import UpdateGuide from '../items/UpdateGuide';

const Booking = ({ online, updateAvailable }) => {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  return (
    <>
      {showUpdatePopup && (
        <UpdateGuide setShowUpdatePopup={setShowUpdatePopup} />
      )}
      <FloorSideBar
        index={3}
        online={online}
        updateAvailable={updateAvailable}
        setShowUpdatePopup={setShowUpdatePopup}
      />
      <BookCustomer />
    </>
  );
};
export default Booking;
