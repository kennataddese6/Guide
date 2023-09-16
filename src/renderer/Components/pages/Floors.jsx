import SideBar from '../items/SideBar';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFloors, reset } from 'renderer/features/Floors/floorSlice';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Spinner from '../Utilities/Spinner';

const Floors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Floors, setFloors] = useState([]);
  const [cellStyle, setCellStyle] = useState({});
  const FloorTableRef = useRef();
  const { user } = useSelector((state) => state.auth);

  const { isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.floor
  );
  const Copy = (event) => {
    // check if the browser supports the Clipboard API
    if (!navigator.clipboard) {
      console.log('Clipboard API not supported');
      return;
    }

    // write the cell's value to the clipboard
    navigator.clipboard
      .writeText(event.value)
      .then(function () {
        console.log('Copied to clipboard');

        // add the 'copied' CSS class to the cell
        event.cellElement.classList.add('copied');

        // remove the 'copied' CSS class after five seconds
        setTimeout(function () {
          event.cellElement.classList.remove('copied');
        }, 5000);
      })
      .catch(function (err) {
        console.error('Error copying to clipboard', err);
      });
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);
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
        style={{ height: 600, width: '70%', marginLeft: '12%' }}
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
          onCellDoubleClicked={Copy}
          // pagination={true}
          //paginationPageSize={true}
        ></AgGridReact>
      </div>
    </>
  );
};
export default Floors;
