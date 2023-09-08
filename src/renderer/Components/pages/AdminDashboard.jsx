import AdminSidebar from '../items/AdminSidebar';
import RegisterFloors from '../items/RegisterFloors';
const AdminDashboard = () => {
  return (
    <>
      <AdminSidebar index={1} />
      <RegisterFloors />
    </>
  );
};
export default AdminDashboard;
