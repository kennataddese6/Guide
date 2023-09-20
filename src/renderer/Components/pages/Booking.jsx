import FloorSideBar from '../items/FloorSidebar';
import BookCustomer from '../items/BookCustomer';
const Booking = ({ online }) => {
  return (
    <>
      <FloorSideBar index={3} online={online} />
      <BookCustomer />
    </>
  );
};
export default Booking;
