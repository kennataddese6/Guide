import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'renderer/features/auth/authSlice';
import { useEffect, useState, useRef, useMemo } from 'react';
import { reset } from 'renderer/features/auth/authSlice';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomModal from 'renderer/features/hook/CustomModal';
import { ResetPassword } from 'renderer/features/auth/authSlice';
import NotificationModal from 'renderer/features/hook/NotificationModal';
const Users = () => {
  const dispatch = useDispatch();
  const UserTableRef = useRef();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState({
    email: '',
  });
  const { isSuccessgetFloorReceptionists, isError, message, isSuccess } =
    useSelector((state) => state.auth);
  const BtnCellRenderer = (props) => {
    const btnClickedHandler = () => {
      props.clicked(props.data.Email);
    };

    return (
      <button className="resetButton" onClick={btnClickedHandler}>
        Reset
      </button>
    );
  };
  const openModal = (content) => {
    setResetEmail({ email: content });
    setModalContent(content);
    setIsModalOpen(true);
    setShowModal(false);
  };

  const closeModal = () => {
    setResetEmail({ email: '' });
    setIsModalOpen(false);
  };
  const handleSubmit = () => {
    dispatch(ResetPassword(resetEmail));
    closeModal();
  };

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

  useEffect(() => {
    if (isSuccess) {
      setShowModal(true);
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
      field: 'Role',
      filter: true,
    },

    { field: 'PhoneNumber' },
    { field: 'Email' },

    { field: 'FloorNumber', filter: true },
    {
      field: 'ResetPassword',
      cellRenderer: BtnCellRenderer,
      cellRendererParams: {
        clicked: function (email) {
          openModal(email);
        },
      },
    },
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
                Role:
                  user.Roles === 7706
                    ? 'Admin'
                    : user.Roles === 4800
                    ? 'Floor receptionist'
                    : user.Roles === 1000
                    ? 'Lobby receptionist'
                    : '',
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
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        content={modalContent}
        resetPassowrd={handleSubmit}
      />
      {showModal && <NotificationModal />}
    </div>
  );
};
export default Users;
