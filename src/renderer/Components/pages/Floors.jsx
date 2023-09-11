import SideBar from '../items/SideBar';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFloors, reset } from 'renderer/features/Floors/floorSlice';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Spinner from '../Utilities/Spinner';

const Floors = () => {
  const dispatch = useDispatch();
  const [Floors, setFloors] = useState([]);
  const FloorTableRef = useRef();
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

  const [columnDefs] = useState([
    {
      field: 'WorkUnit',
      filter: true,
    },

    {
      field: 'Divison',
      filter: true,
    },
    {
      field: 'Department',
      filter: true,
    },
    { field: 'FloorNumber', filter: true },

    { field: 'OfficeNumber', filter: true },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  }, []);
  const popupParent = useMemo(() => {
    return document.body;
  }, []);
  return (
    <>
      <SideBar index={3} />

      <div
        id="myGrid"
        className="ag-theme-alpine"
        style={{ height: 600, width: '70%', marginLeft: '20%' }}
      >
        {isLoading && Spinner}
        <AgGridReact
          ref={FloorTableRef}
          rowData={Floors.map((floor) => ({
            WorkUnit: floor.WorkUnit,
            Divison: floor.Divison,
            Department: floor.Department,
            OfficeNumber: floor.OfficeNumber,
            FloorNumber: floor.FloorNumber,
          }))}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressExcelExport={true}
          popupParent={popupParent}
          // pagination={true}
          //paginationPageSize={true}
        ></AgGridReact>
      </div>
    </>
  );
};
export default Floors;
