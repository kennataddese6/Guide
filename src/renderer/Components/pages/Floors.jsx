import SideBar from '../items/SideBar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFloors } from 'renderer/features/Floors/floorSlice';
const Floors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFloors());
  }, []);

  return (
    <>
      <SideBar index={3} />
      <h1>This is Floors page</h1>
    </>
  );
};
export default Floors;
