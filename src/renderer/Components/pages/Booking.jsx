import FloorSideBar from '../items/FloorSidebar';
import BookCustomer from '../items/BookCustomer';
const Booking = ({ online, updateAvailable }) => {
  return (
    <>
      <FloorSideBar
        index={3}
        online={online}
        updateAvailable={updateAvailable}
      />
      <BookCustomer />
    </>
  );
};
export default Booking;
