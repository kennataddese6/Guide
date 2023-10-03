import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'renderer/features/auth/authSlice';
import { useEffect, useState, useRef, useMemo } from 'react';
import { reset } from 'renderer/features/auth/authSlice';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
const Users = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const UserTableRef = useRef();
  const { isSuccessgetFloorReceptionists, isError, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  useEffect(() => {
    if (isSuccessgetFloorReceptionists) {
      setUsers(message);
    }
    if (isError) {
      console.log('sorry something went wrong');
    }
    dispatch(reset());
  }, [isSuccessgetFloorReceptionists, isError]);
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
      field: 'Role',
      filter: true,
    },

    { field: 'PhoneNumber' },
    { field: 'Email' },

    { field: 'FloorNumber', filter: true },
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
    <div
      id="myGrid"
      className="ag-theme-alpine"
      style={{ height: 600, width: '70%', marginLeft: '12%' }}
    >
      <AgGridReact
        ref={UserTableRef}
        rowData={
          users
            ? users.map((user) => ({
                FirstName: user.FirstName,
                LastName: user.LastName,
                FloorNumber: user.FloorNumber,
                Role: user.Roles,
                PhoneNumber: user.PhoneNumber,
                Email: user.Email,
              }))
            : []
        }
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        suppressExcelExport={true}
        popupParent={popupParent}
      ></AgGridReact>
    </div>
  );
};
export default Users;
