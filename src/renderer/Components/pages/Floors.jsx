import SideBar from '../items/SideBar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFloors, reset } from 'renderer/features/Floors/floorSlice';
const Floors = () => {
  const dispatch = useDispatch();
  const [Floors, setFloors] = useState('');
  const { isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.floor
  );
  useEffect(() => {
    dispatch(getFloors());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setFloors(message);
    }
    if (isError) {
    }
    dispatch(reset());
  }, [isSuccess, isError]);
  return (
    <>
      <SideBar index={3} />
      <h1>This is Floors page</h1>
    </>
  );
};
export default Floors;
