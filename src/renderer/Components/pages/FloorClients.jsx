import { useEffect, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FloorSideBar from '../items/FloorSidebar';
import { getFloorCustomers } from 'renderer/features/customers/customerSlice';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate } from 'react-router-dom';
const FloorClients = ({ online }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.customer);
  const { user } = useSelector((state) => state.auth);
  const ClientTableRef = useRef();
  const [floorCustomers, setFloorCustomers] = useState([]);
  useEffect(() => {
    dispatch(getFloorCustomers(user ? user.FloorNumber : ''));
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);
  useEffect(() => {
    setFloorCustomers(message);
    console.log(floorCustomers);
  }, [message]);
  const [columnDefs] = useState([
    {
      field: 'FirstName',
      filter: true,
    },

    {
      field: 'LastName',
      filter: true,
    },
    {
      field: 'Woreda',
      filter: true,
    },
    { field: 'SubCity', filter: true },

    { field: 'PhoneNumber' },
    { field: 'Department' },
    { field: 'FloorNumber' },
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
      <FloorSideBar index={4} online={online} />
      <div
        id="myGrid"
        className="ag-theme-alpine"
        style={{ height: 600, width: '70%', marginLeft: '12%' }}
      >
        <AgGridReact
          ref={ClientTableRef}
          rowData={
            floorCustomers
              ? floorCustomers.map((client) => ({
                  FirstName: client.FirstName,
                  LastName: client.LastName,
                  Woreda: client.Woreda,
                  SubCity: client.SubCity,
                  PhoneNumber: client.PhoneNumber,
                  Department: client.Department,
                  FloorNumber: client.FloorNumber,
                }))
              : []
          }
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressExcelExport={true}
          popupParent={popupParent}
        ></AgGridReact>
      </div>
    </>
  );
};
export default FloorClients;
