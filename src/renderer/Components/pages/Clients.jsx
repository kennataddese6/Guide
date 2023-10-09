import SideBar from '../items/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from 'renderer/features/customers/customerSlice';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate } from 'react-router-dom';
import { reset } from 'renderer/features/customers/customerSlice';
import { ModuleRegistry } from '@ag-grid-community/core';
import { CsvExportModule } from '@ag-grid-community/csv-export';
ModuleRegistry.registerModules([CsvExportModule]);

const Clients = ({ online }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ClientTableRef = useRef();
  const { message, isSuccess } = useSelector((state) => state.customer);
  const { user } = useSelector((state) => state.auth);
  const [allClients, setAllClients] = useState([]);
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);
  useEffect(() => {
    dispatch(getCustomers());
  }, []);
  useEffect(() => {
    if (isSuccess) {
      setAllClients(message);
    }
    dispatch(reset());
  }, [isSuccess]);

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
      field: 'Gender',
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
  const Export = useCallback(() => {
    ClientTableRef.current.api.exportDataAsCsv();
  }, []);
  return (
    <>
      {' '}
      <SideBar index={4} online={online} />
      <div
        id="myGrid"
        className="ag-theme-alpine"
        style={{ height: 600, width: '70%', marginLeft: '12%' }}
      >
        <AgGridReact
          ref={ClientTableRef}
          rowData={allClients.map((client) => ({
            FirstName: client.FirstName,
            LastName: client.LastName,
            Woreda: client.Woreda,
            SubCity: client.SubCity,
            PhoneNumber: client.PhoneNumber,
            Department: client.Department,
            FloorNumber: client.FloorNumber,
            Gender: client.Gender,
          }))}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressExcelExport={true}
          popupParent={popupParent}
          suppressExcelExport={true}
          // pagination={true}
          //paginationPageSize={true}
        ></AgGridReact>

        <div
          className="submitBut"
          style={{ marginTop: '20px' }}
          onClick={() => {
            Export();
          }}
        >
          {' '}
          Download{' '}
        </div>
      </div>
    </>
  );
};
export default Clients;
