import { useNavigate } from 'react-router-dom';
const LobbyDashboard = () => {
  const navigate = useNavigate();
  const toHomepage = () => {
    navigate('/');
  };
  return (
    <>
      <button onClick={toHomepage}> LobbyDasboard</button>
      <div> Hello this is a new page</div>
    </>
  );
};

export default LobbyDashboard;
